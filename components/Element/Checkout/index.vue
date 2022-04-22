<template lang="html">
  <section class="relative" v-if="!soldout">

    <Steps :steps="steps" :active="active" :success="success" :style="{background: colors.primary || null}" id="steps"/>

    <div v-if="error" class="absolute inset-0 bg-white z-20 flex justify-center items-center">
      <div class="text-center">
        <h1 class="font-header font-bold uppercase text-30 mb-20">Error</h1>
        <p class="font-semibold mb-20" v-html="error"/>
        <button @click="resetPayment" v-html="'Try Again'" class="button"/>
      </div>
    </div>

    <div v-if="success" class="py-40 px-20 lg:px-40 bg-lime">
      <slot name="success"/>
    </div>

    <div v-else class="py-40 px-20 lg:px-40" ref="container" :class="{'opacity-0':error}">

      <template v-for="(form, i) in forms">
        <div :class="{ hidden: active != i }">
          <ElementForm multiColumn :fields="form.items" @submit="(e) => handleForm(e, form)" :test="dev">
            <Btn value="Next" :color="colors.primary"/>
          </ElementForm>
        </div>
      </template>

      <template>
        <div :class="{ hidden: active != forms.length }">
          <Products @submit="handleProducts" :products="productData">
            <Btn value="Next" :color="colors.primary" />
          </Products>
        </div>
      </template>

      <template>
        <div class="relative" :class="{ hidden: active <= forms.length || success }">
          <div v-if="!paymentLoaded" class="absolute inset-0 z-20 bg-white flex justify-center items-center">
            <Loading/>
          </div>
          <div :class="{'h-500px opacity-0':!paymentLoaded}">
            <div ref="stripe" id="payment-element" class="max-w-400px mx-auto"/>
            <Btn :value="status ? status : `Pay ${total}`" @clicked="makePayment"/>
          </div>
        </div>
      </template>

      <div class="mt-20 text-center" :class="{'opacity-20 pointer-events-none': active == 0}">
        <button v-html="'Back'" @click="active > 0 && previousStep()" />
      </div>

    </div>
  </section>

  <div v-else class="flex justify-center items-center py-40 px-20 lg:px-40 bg-lime">
    <slot name="soldout"/>
  </div>

</template>

<script>
import config from "@/tailwind.config.js";
import Btn from './Btn'
import Steps from './Steps'
import Products from './Products'

export default {
  components:{Btn,Steps,Products},
  props: {
    forms: { type: Array, defult: () => [] },
    products: { type: Array, defult: () => [] },
    productsTitle:{type:String,default:null},
    paymentTitle:{type:String,default:null},
    paymentDescription:{type:String,default:'Payment For Goods'},
    colors:{type:Object,default:()=>({})},
    token:{type:String,default:null}
  },
  mounted(){
    this.dev = false
    this.getProducts();
  },
  data: () => ({
    dev:false,
    productData: [],
    active: 0,
    cart: [],
    email: null,
    total: null,
    error: null,
    success: false,
    status: null,
    paymentLoaded: false,
    soldout: false
  }),
  computed:{
    steps(){
      let steps = []
      this.forms.forEach((f,i) => steps.push({label:f.primary.title}))
      steps.push({label:this.productsTitle})
      steps.push({label:this.paymentTitle})
      return steps
    },
    id(){
      return Object.keys(this.$route.params).map(k => this.$route.params[k]).join('-')
    }
  },
  methods: {
    nextStep(){
      gsap.timeline()
          .to(this.$refs.container,.5,{x:-50,opacity:0,ease:'power4.in'},0)
          .add(()=>this.active++,'>')
          .set(this.$refs.container,{x:50,opacity:0},'>')
          .to(this.$refs.container,.5,{x:0,opacity:1,ease:'power4.out'},'<')
          .to(window,.75,{ease:'expo.inOut',scrollTo:{y:'#steps'}},'<')
    },
    previousStep(){
        gsap.timeline()
            .to(this.$refs.container,.5,{x:50,opacity:0,ease:'power4.in'},0)
            .add(()=>this.active--,'>')
            .set(this.$refs.container,{x:-50,opacity:0},'>')
            .to(this.$refs.container,.5,{x:0,opacity:1,ease:'power4.out'},'<')
            .to(window,.75,{ease:'expo.inOut',scrollTo:{y:'#steps'}},'<')
    },
    handleForm(data, form) {
      this.$emit("formSubmit", { data, form });
      if (data.email) this.email = data.email;
      this.nextStep()
    },
    handleProducts(data) {
      this.total = data.total;
      this.cart = data.products.map((p) => ({ id: p.id, amount: p.amount }));
      if(this.cart.length > 0){
        this.getPayment();
        this.$emit("productsSubmit", data);
        this.nextStep()
      }
    },
    async getProducts() {

      console.log(this.token)

        let products = this.products.map((p) => ({pid:p.pid,soldout:p.soldout}));
        let res = await fetch(`${this.$config.baseUrl}/.netlify/functions/get-products`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products, token: this.token }),
          });

        let data = await res.json();

        data.products.forEach((item) => {
          let prod = this.products.find((p) => item.pid == p.pid);
          this.productData.push({
            id: item.id,
            name: item.product.name,
            key: prod.key,
            description: prod.description,
            price: item.unit_amount / 100,
            max: prod.max,
            min: prod.min,
            group: prod.group,
          });
        });

        this.soldout = this.productData.length == 0

    },

    async getPayment() {
      if(this.paymentLoaded) return

      this.tokens = sessionStorage.getItem("fp_stripe_tokens");
      if (!this.tokens) {
        let description = this.email ? `${this.paymentDescription} || ${this.email}` : this.paymentDescription
        let response = await fetch(`${this.$config.baseUrl}/.netlify/functions/payment-intent`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ method: "create", products: this.cart, description }),
          });
        this.tokens = await response.json();
        if (this.tokens) sessionStorage.setItem("fp_stripe_tokens",JSON.stringify(this.tokens));
      } else {
        this.tokens = JSON.parse(this.tokens);
      }

      if (this.tokens) {
        let appearance = {
          theme: "stripe",
          fonts:[{cssSrc: 'https://fonts.googleapis.com/css?family=Open+Sans'}],
          variables: {
            colorPrimary: config.theme.colors.black,
            fontFamily: "Open Sans",
          },
          rules: {
            ".Input": {
              boxShadow: `3px 3px 0px ${config.theme.colors.black}`,
              border: `1px solid ${config.theme.colors.black}`,
            },
            ".Label": {
              opacity: 1,
              fontSize: "1rem",
              fontWeight: 500,
              color: config.theme.colors.black,
              marginBottom: ".5rem",
            },
          },
        };

        this.stripe = Stripe(this.$config.stripePublishableKey);
        this.elements = this.stripe.elements({appearance,clientSecret: this.tokens.clientSecret});
        this.paymentElement = this.elements.create("payment");
        this.paymentElement.on("ready", () => setTimeout(()=>this.paymentLoaded = true,1000));
        this.paymentElement.mount(this.$refs.stripe);
      }
    },

    async makePayment() {
      let response;
      let confirmParams = {};
      let error = null

      this.status = 'Verifying...'

      response = await fetch(`${this.$config.baseUrl}/.netlify/functions/payment-intent`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "update",
          products: this.cart,
          id: this.tokens.id,
        }),
      });

      let data = await response.json();

      if (data.success) {

        this.status = 'Sending...'

        if (this.email) confirmParams.receipt_email = this.email;

        response = await this.stripe.confirmPayment({
          confirmParams,
          elements: this.elements,
          redirect: "if_required",
        });

        if (response.paymentIntent && response.paymentIntent.status == "succeeded") {
          sessionStorage.removeItem("fp_stripe_tokens");
          this.$emit("paymentSubmit",response.paymentIntent);
          this.success = true;
          return;
        }

        error = response.error.message
      } else {
        error = 'Oops! There was a problem, please try again'
      }

      this.error = error
      this.status = null
    },

    async resetPayment(){
      sessionStorage.removeItem("fp_stripe_tokens");
      this.paymentLoaded = false
      this.error = null
      this.$nextTick(this.getPayment)
    }
  },
};
</script>
