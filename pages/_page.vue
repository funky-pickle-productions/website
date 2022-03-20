<template lang="html">
  <main id="page" :key="$route.path">
    <Landing v-if="data.title" :image="data.image" :video="data.video" :title="data.title"/>
    <NavSlices v-if="data.header" :slices="slices" scrollId="#page"/>
    <Slices :slices="slices" class="page-content"/>
  </main>
</template>

<script>
export default {
  name: 'Page',
  async asyncData({ redirect, store, route, $prismic, payload }) {
    let res = null;
    let page = route.path.replaceAll("/", "") || 'home';
    let data = store.state.pages[page];

    if (payload){
      store.commit("PAGE", [page,payload.data])
      data = payload.data
    };

    if (!data) {
      res = await $prismic.api.getByUID('page',page);
      if(res){
        store.commit("PAGE", [page, res.data]);
        data = res.data
      }
    }

    if (data) return { data,page }
    redirect('/404')

  },
  data:()=>({
    data: {},
  }),
  mounted(){
    this.$bus.$emit('LOADED')
  },
  computed:{
    slices(){
      if(!this.data.slices) return []

      let slices = []
      this.data.slices.forEach((s,i) => {
        (s.primary.publish || s.primary.publish == null) && slices.push({...s,id:`${s.slice_type}-${i}`})
      })
      return slices
    }
  }
}
</script>
