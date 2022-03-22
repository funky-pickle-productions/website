<template lang="html">
  <main id="page" :key="$route.path">

    <Landing
      v-if="data.title"
      :image="data.image"
      :video="data.video"
      :title="data.title"
      :svg="data.svg"
    />

    <NavSlices
      v-if="data.header"
      :slices="slices"
      scrollId="#page"
    />

    <template v-for="(slice,i) in slices">
      <component
        :class="{'pb-space-2x': i == slices.length - 1}"
        class="gutters pt-space-2x"
        :is="components[slice.slice_type]"
        :slice="slice"
        :id="slice.id"
        />
    </template>

  </main>
</template>

<script>
import {components} from '@/slices'
import mixins from '@/mixins/mixins'
export default {
  mixins:[mixins],
  name: 'Page',
  async asyncData({ error, store, route, $prismic, payload }) {

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

    error({statusCode: 404});

  },
  data:()=>({
    data: {},
    components
  }),
  computed:{
    slices(){
      if(!this.data.slices) return []

      let slices = []
      this.data.slices.forEach((s,i) => {
        if(s.primary.publish || s.primary.publish == null){
          slices.push({...s,id:`${s.slice_type}-${i + 1}`})
        }
      })
      return slices
    }
  }
}
</script>
