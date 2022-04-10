<template lang="html">
  <main id="checkout">

    <div class="relative z-10 pt-300px md:pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="event.background" />
      </div>
    </div>

    <section class="gutters pb-space-2x relative z-40" ref="section">

      <div class="rounded-lg overflow-hidden bg-white graphic-box">

        <div class="text-center px-20 py-40">
          <h3 class="uppercase tracking-widest mb-20 font-bold" :style="{color:colors.primary}" v-html="checkout.title"/>
          <h1 class="font-header uppercase font-bold leading-09 text-40" v-html="event.title"/>
        </div>

        <ElementCheckout
          :key="key"
          :colors="colors"
          :forms="forms"
          :products="checkout.products"
          :paymentDescription="eventCheckout.description"
          :productsTitle="checkout['products-title']"
          :paymentTitle="checkout['payment-title']"
          @formSubmit="handleFormSubmit"
          @productsSubmit="handleProductsSubmit"
          @paymentSubmit="handlePaymentSubmit"
        >

          <template #success>
            <div class="flex items-center justify-center min-h-400px">
              <div class="text-center">
                <ElementText :field="checkout.success" />
                <div class="mt-40 flex flex-row ">
                  <nuxt-link :to="`/event/${$route.params.id}`" v-html="'Return to Event'" class="button"/>
                  <button @click="key++" v-html="'Register Another Person'" class="button ml-10"/>
                </div>
              </div>
            </div>
          </template>

        </ElementCheckout>

      </div>

    </section>
  </main>
</template>

<script>
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
  async asyncData({ error, store, params, $prismic, payload }){
    let checkout = store.state.checkouts[params.checkout] || null
    let event = store.state.events[params.id] || null
    let res

    if (!event){
      res = await $prismic.api.getByUID("event", params.id);
      if (res) {
        store.commit("EVENT", [params.id, res.data]);
        event = res.data;
      }
    }

    if (!checkout){
      res = await $prismic.api.getByUID("checkout", params.checkout);
      if (res) {
        store.commit("CHECKOUT", [params.checkout, res.data]);
        checkout = res.data;
      }
    }

    if (event && checkout) return {event,checkout}
    error({ statusCode: 404 });

  },
  mounted(){
    this.anim = ScrollTrigger.create({
      trigger:this.$refs.section,
      start:'top top',
      end: 'bottom top',
      onToggle:(e)=> this.$bus.$emit('PAUSE_TOP_NAV',e.isActive)
    })
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  watch:{
    key(){
      this.formData = []
    }
  },
  data:()=>({
    event:null,
    checkout:null,
    formData:[],
    key: 0
  }),
  computed:{
    colors(){
      if (!this.event) return {}
      return {
        primary:this.event.primary,
        secondary:this.event.secondary
      }
    },
    forms() {
      let forms = [];
      if (!this.checkout.slices || this.checkout.slices.length == 0) return [];
      this.checkout.slices.forEach((s, i) => (s.primary.publish || s.primary.publish == null) && forms.push(s));
      return forms.slice(0,1);
    },
    eventCheckout(){
      if (!this.event) return {}
      let checkout = this.event.checkout.find(c => c.link.uid == this.$route.params.checkout)
      return checkout || {}
    }
  },
  methods:{
    handleFormSubmit({data,form}){
      this.formData.push({data,form})
    },
    async handleProductsSubmit(data){
      for (let i = 0; i < this.formData.length; i++){
        data.products.forEach(p => this.formData[i].data[p.key] = p.amount)
      }
    },
    async handlePaymentSubmit(){

      for (let i = 0; i < this.formData.length; i++){
        if (this.formData[i].form.primary.action){

          let formData = new FormData()
          let data = {...this.formData[i].data,sheetName:this.eventCheckout.sheet}
          Object.keys(data).forEach(key => formData.append(key,data[key]))
          let res = await fetch(this.formData[i].form.primary.action, {method: 'POST',body:formData})

          let resData = await res.json()
          console.log(resData)
        }
      }

    }
  }
}
</script>
