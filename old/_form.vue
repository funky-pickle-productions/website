<template lang="html">
  <main>
    <div class="relative z-10 pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="event.background" />
      </div>
    </div>

    <div class="relative z-20 gutters pb-space-2x">

      <div class="bg-white px-20 py-50 lg:px-50 graphic-box rounded-lg">

        <div class="text-center mb-40">
          <h3 v-html="event.title" :style="{ color: event.primary }" class="text-13 md:text-15 font-bold mb-20 leading-12"/>
          <h1 v-html="data.title" class="font-header font-bold uppercase leading-09 text-40 md:text-60"/>
        </div>

        <div class="overflow-hidden">
          <div class="flex flex-row" ref="forms">

            <template v-for="(slice,i) in slices">
              <div :key="i" class="form-container flex-shrink-0 w-full overflow-hidden" >
                <ElementForm
                  class="p-10"
                  :name="slice.id"
                  :fields="slice.items"
                  :once="false"
                  @submit="(data)=>handleSubmit(data,slice.id)"
                  multiColumn
                  externalSubmit
                  buttonLabel="next"
                  ref="form"
                />
              </div>
            </template>

            <div class="form-container flex-shrink-0 w-full overflow-hidden">
              <StripeForm class="p-10" ref="stripe"/>
            </div>

          </div>
          <div class="flex flex-row justify-center p-10 mt-20" ref="buttons">
            <button class="button mr-05" :class="{'button-disabled': step < 1}" @click="handleBack" v-html="'Back'"/>
            <button class="button" v-html="step == totalSteps ? 'Submit' : 'Next'" @click="handleClick"/>
          </div>

        </div>

      </div>

    </div>
  </main>
</template>

<script>
import { random } from "@/assets/helpers";
import mixins from '@/mixins/mixins'
import stripe from 'stripe'
export default {
  mixins:[mixins],
  name:'EventForm',
  async asyncData({ payload, error, store, params, $prismic }) {

    let eventId = params.event;
    let formId = params.form;
    let event = store.state.events[eventId] || null;
    let data = store.state.forms[formId] || payload || null;

    async function get(t,s,id){
      let res = await $prismic.api.getByUID(t, id);
      res && store.commit(s, [id, res.data]);
      return res ? res.data : null
    }

    if (!event) event = await get('event','EVENT',eventId)
    if (!data) data = await get('form','FORM',formId)

    if (data && event) {
      let form = 'registration' //event.links.find(l => l.link.uid == formId)
      if(form) return { data, event }
    }
    error({statusCode: 404});
  },
  data: () => ({
    data: {},
    event: {},
    formData:{},
    step: 0,
    totalSteps:0
  }),
  mounted() {
    this.$bus.$emit("LOADED");
    this.formContainers = document.querySelectorAll('.form-container')
    this.totalSteps = this.slices.length
  },
  destroyed(){
    this.$bus.$emit('UNLOADED')
  },
  watch:{
    step(to,from){
      this.$nextTick(()=>{
        let dur = .75
        let offsetHeight = window.innerHeight - (this.$refs.buttons.offsetHeight + 50)
        console.log(offsetHeight)
        gsap.timeline()
            //.to(this.formContainers[to],dur,{height:'auto',ease:'expo.inOut'})
            .to(this.formContainers,dur,{x: to > from ? '-=100%' : '+=100%',ease:'expo.inOut'},'<+=.2')
            //.to(this.formContainers[from],dur,{height:0,ease:'expo.inOut'},'<+=.2')
            .to(window,dur,{scrollTo:{y:this.$refs.buttons,offsetY:offsetHeight },ease:'expo.inOut'},'<')
      })
    }
  },
  computed: {
    slices(){
      if(!this.data.slices) return []
      let slices = []
      this.data.slices.forEach((s,i) => {
        if (s.primary.publish || s.primary.publish == null) {
          slices.push({ ...s, id: `${s.slice_type}-${i + 1}` });
        }
      })
      return slices
    },
    fields() {
      return this.data.slices.map((f) => f.primary);
    },
    link() {
      let link = this.event.links.find((l) => l.link.uid == this.$route.params.form);
      return link || {};
    },
  },
  methods:{
    handleClick(){
      if (this.step < this.totalSteps){
        this.$refs.form[this.step].$formulate.submit(this.slices[this.step].id)
      } else {
        console.log('submitting stripe')
      }
    },
    handleBack(){
      this.step = this.step - 1
    },
    handleSubmit(data,id){
      this.formData[id] = data
      this.step = this.step + 1
    }
  }
};
</script>
