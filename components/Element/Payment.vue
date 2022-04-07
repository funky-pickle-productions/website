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
    products:{type:Array,default:()=>[]},
    total:{type:String,default: null},
    receiptEmail:{type:String,default:null}
  },
  mounted(){
    this.products.length > 0 && this.initalize()
  },
  data:()=>({
    stripe:null,
    id:null,
    loading:true,
    success:false,
    error:false
  }),
  methods:{
    async updatePaymentIntent(){

      let response = await fetch(`${this.$config.baseUrl}/.netlify/functions/payment-intent`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({method:'update',products: this.products,id:this.tokens.id,customer: this.customer}),
      })

    },
    async getTokens(){
      let tokens = sessionStorage.getItem("fp_stripe_tokens")
      if(tokens){
        return JSON.parse(tokens)
      } else {
        return await this.createPaymentIntent()
      }
    },
    async createPaymentIntent(){

      let response = await fetch(`${this.$config.baseUrl}/.netlify/functions/payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({method:'create', products: this.products}),
      });

      let tokens = await response.json()

      if (tokens){
        sessionStorage.setItem("fp_stripe_tokens", JSON.stringify(tokens) );
        return tokens ;
      }

    },
    async initalize(){

      this.tokens = await this.getTokens()

      if(this.tokens){

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
        this.elements = this.stripe.elements({ appearance, clientSecret: this.tokens.clientSecret});
        this.paymentElement = this.elements.create("payment");
        this.paymentElement.on('ready',()=> this.loading = false)
        this.paymentElement.mount(this.$refs.el);

      }

    },
    async submit(){

      await this.updatePaymentIntent()

      let confirmParams = {}
      if (this.receiptEmail) confirmParams.receipt_email = this.receiptEmail


      let res = await this.stripe.confirmPayment({
        elements: this.elements,
        redirect: "if_required",

      })
      if(res.paymentIntent) {
        this.$emit('success',res.paymentIntent)
        sessionStorage.removeItem('fp_stripe_tokens');
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
