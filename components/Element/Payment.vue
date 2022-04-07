<template lang="html">
  <div class="min-h-200 relative flex items-center">
    <div class="absolute inset-0 bg-white flex items-center justify-center" v-if="loading">
      <Loading/>
    </div>
    <div class="flex-auto" ref="el" id="payment-element"/>
  </div>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  props:{
    products:{type:Array,default:()=>[]}
  },
  mounted(){
    this.products.length > 0 && this.initialize()
  },
  destroyed(){
    if (!this.success && this.id) this.cancel()
  },
  data:()=>({
    stripe:null,
    id:null,
    loading:true,
    success:false,
    error:false
  }),
  methods:{
    async cancel(){
      let response = await fetch("/.netlify/functions/payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({type:'cancel',id:this.id}),
      });
    },
    async initialize(){

      let response = await fetch(`${this.$config.baseUrl}/.netlify/functions/payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({type:'create',products: this.products}),
      });

      let data = await response.json();

      if(data){

        let appearance = {
          theme:'stripe',
          variables:{
            colorPrimary: config.theme.colors.black,
            fontFamily:'Open Sans'
          },
          rules:{
            '.Input':{
              boxShadow:`3px 3px 0px ${config.theme.colors.black}`,
              border:'none',
              outline:`1px solid ${config.theme.colors.black}`
            },
            '.Label':{
              opacity: 1,
              fontSize: '1rem',
              fontWeight:500,
              color: config.theme.colors.black,
              marginBottom:'.5rem'
            }
          }
        }

        this.stripe = Stripe(this.$config.stripePublishableKey)
        this.elements = this.stripe.elements({ appearance, clientSecret: data.client_secret });
        this.paymentElement = this.elements.create("payment");
        this.paymentElement.on('ready',()=> this.loading = false)
        this.paymentElement.mount(this.$refs.el);
        this.id = data.id

      }

    },
    async submit(){
      let res = await this.stripe.confirmPayment({
        elements: this.elements,
        redirect: "if_required"
      })
      if(res.paymentIntent) {
        this.$emit('success',res.paymentIntent)
        this.success = true
      }
      if(res.error) {
        this.$emit('error',res.error)
        this.error = res.error
      }
    }
  }
}
</script>
