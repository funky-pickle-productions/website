<template lang="html">
  <main id="checkout">
    <div class="gutters pt-space-2x pb-space-2x">

      <Title v-if="title" :value="title" class="mb-40"/>

      <div class="rounded-lg overflow-hidden graphic-box bg-white">

        <template v-if="instance">
          <div v-if="type == 'event'" class="py-20 px-20 lg:px-40 text-15 bg-lime text-center">
            <h3 class="font-bold" v-html="instance.title"/>
            <h3 class="" v-html="formatDate(instance.date,'dddd, mmmm dd, yyyy')"/>
          </div>
        </template>

        <div class="py-20 px-10 md:px-40 flex flex-row items-center justify-between bg-black text-white pointer-events-none" ref="top">
          <template v-for="(s,i) in steps">
            <div class="checkout-step flex-grow-0 flex-shrink-0" :class="{'opacity-40': !s.complete && step != i + 1}">
              <h3 class="inline-block font-bold text-10 lg:text-12" v-html="s.label"/>
              <Icon check class="inline-block w-10 ml-05 fill-lime" :class="{'hidden': !s.complete}"/>
            </div>
          </template>
        </div>

        <div class="py-40 px-10 md:px-40" ref="content">

          <ElementForm
            name="checkout-form"
            :class="{hidden:step != 1}"
            :fields="form.items"
            :once="false"
            @submit="handleForm"
            multiColumn
            ref="form"
          />

          <ElementProducts
            ref="products"
            :class="{hidden:step != 2}"
            :products="products.items"
            @submit="handleProducts"
          />

          <ElementPayment
            ref="stripe"
            class="max-w-300 mx-auto"
            v-if="productData && step == 3"
            :products="productData.products"
            @success="handleSuccess"
            @error="handleError"
          />

          <div class="mt-30 text-center">
            <button class="button button-grow md:max-w-200" @click="handleNext" v-html="buttonLabel"/>
            <button class="mt-20" v-html="'Back'" :class="{'opacity-40':step == 1}" @click="step > 1 && (step -= 1)"/>
          </div>

        </div>

        <div class="py-40 px-20 md:px-40 hidden text-center" ref="success">
          <ElementText :field="data.success" calloutColor="pink"/>
        </div>

      </div>

    </div>
  </main>
</template>

<script>
import mixins from '@/mixins/mixins'
import {formatDate} from '@/assets/helpers'
export default {
  mixins:[mixins],
  name:'Checkout',
  async asyncData({ error, store, params,query, $prismic, payload }) {
    let res = null;
    let uid = params.id;
    let data = store.state.checkouts[uid];
    let instance = null
    let type = query.type

    if (payload) {
      store.commit("CHECKOUT", [uid, payload.data]);
      data = payload.data;
    }

    if(type == 'event'){
      instance = store.state.events[query.uid]
      if (!instance){
        res = await $prismic.api.getByUID("event", query.uid);
        if (res) {
          store.commit("EVENT", [query.uid, res.data]);
          instance = res.data;
        }
      }
    }

    if (!data) {
      res = await $prismic.api.getByUID("checkout", uid);
      if (res) {
        store.commit("CHECKOUT", [uid, res.data]);
        data = res.data;
      }
    }

    if (data) return { data,instance,type};
    error({ statusCode: 404 });
  },
  data: () => ({
    query:{},
    step: 1,
    data: null,
    formData:null,
    productData:null,
    paymentData:null,
    buttonLabel: 'Next',
  }),
  watch:{
    step(){
      this.updateButtonLabel()
      if(this.step == 2) this.productData = null
      if(this.step == 1) this.formData = null
    }
  },
  computed:{
    title(){
      if (!this.data) return null
      return this.data.title || null
    },
    steps(){
      return [
        {label:this.form.primary.title || 'Form',complete: !!this.formData},
        {label:this.products.primary.title || 'Products',complete: !!this.productData},
        {label:'Payment',complete: !!this.paymentData}
      ]
    },
    form(){
      return this.data.slices.find(s => s.slice_type == 'form')
    },
    products(){
      return this.data.slices.find(s => s.slice_type == 'products')
    }
  },
  methods:{
    formatDate,
    initSuccess(){
      gsap.timeline()
      .to(this.$refs.content,.5,{scale:.5,opacity:0,ease:'expo.out'},0)
      .set(this.$refs.content,{display:'none'},'>')
      .set(this.$refs.success,{display:'block',opacity:0,scale:.5},'<')
      .to(this.$refs.success,.5,{scale:1,opacity:1,ease:'expo.in'},'>')
    },
    updateButtonLabel(){
      this.buttonLabel = this.step < 3 ? 'Next' : this.productData ? `Pay ${this.productData.total}` : 'Make Payment'
    },
    handleForm(data){
      this.formData = data
      this.step = 2
    },
    handleProducts(data){
      this.productData = data
      this.step = 3
    },
    handleSuccess(data){
      this.paymentData = data
      this.buttonLabel = "Payment Sent!"
      this.initSuccess()
    },
    handleError(err){
      this.updateButtonLabel()
      //display something about error
    },
    handleNext(){
      gsap.to(window,.5,{scrollTo:{y:this.$refs.top}})
      switch(this.step){
        case 1:
        return this.$refs.form.$formulate.submit('checkout-form')
        case 2:
        return this.$refs.products.submit()
        case 3:
        this.buttonLabel = 'Sending...'
        return this.$refs.stripe.submit()
      }
    }
  }
}
</script>

<style lang="css">

</style>
