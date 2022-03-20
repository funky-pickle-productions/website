<template lang="html">
  <aside class="hidden md:block fixed left-0 h-full w-nav-side bg-white nav-side-shadow p-30px z-90">
    <nuxt-link to="/" class="block mb-20px">
      <Logo spin color class="w-full"/>
    </nuxt-link>
    <nav class="font-header font-bold uppercase text-20 leading-09">
      <SliceZone :slices="links" :resolver="resolver"/>
    </nav>
  </aside>
</template>

<script>
import {mapState} from 'vuex'
import {resolver} from '@/assets/helpers'
export default {
  data:()=>({
    resolver
  }),
  computed:mapState({
    links: state => state.settings.links
  })
}
</script>

<style lang="css">
  .nav-side-shadow{box-shadow: 2px 0px 2px rgba(theme('colors.bluergb'),.25);}
</style>
