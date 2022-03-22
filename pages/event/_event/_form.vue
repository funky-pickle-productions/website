<template lang="html">
  <main>
    <div class="relative z-10 pt-200px">
      <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
        <Landing :image="event.background" />
      </div>
    </div>

    <div class="relative z-20 gutters pb-space-2x">

      <div class="bg-white px-20 py-50 lg:px-50 graphic-box rounded-lg">

        <div class="text-center">
          <h3 v-html="event.title" :style="{ color: event.primary }" class="text-13 md:text-15 font-bold mb-20 leading-12"/>
          <h1 v-html="data.title" class="font-header font-bold uppercase leading-09 text-40 md:text-60"/>
        </div>

        <div class="overflow-hidden p-05">
          <div class="flex flex-row">
            <template v-for="slice in slices">
              <div class="flex-shrink-0 w-full py-20">
                <ElementForm v-if="slice.slice_type == 'form'" :fields="slice.items" multiColumn/>
                <StripeForm v-else-if="slice.slice_type == 'stripe'" :data="slice"/>
              </div>
            </template>
          </div>
          <div class="text-center">
            <button class="button bg-pink text-white" v-html="'next'"/>
          </div>
        </div>

      </div>

    </div>
  </main>
</template>

<script>
import { random } from "@/assets/helpers";
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
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

    if (!event) event = get('event','EVENT',eventId)
    if (!data) data = get('form','FORM',formId)

    if (data && event) {
      let form = event.links.find(l => l.link.uid == formId)
      if(form) return { data, event }
    }
    error({statusCode: 404});
  },
  data: () => ({
    data: {},
    event: {},
    status: null,
    step: 1
  }),
  mounted() {
    this.$bus.$emit("LOADED");
  },
  destroyed(){
    this.$bus.$emit('UNLOADED')
  },
  computed: {
    slices(){
      if(!this.data.slices) return []
      let slices = []
      this.data.slices.forEach((s,i) => {
        (s.primary.publish || s.primary.publish == null) && slices.push(s)
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
  }
};
</script>
