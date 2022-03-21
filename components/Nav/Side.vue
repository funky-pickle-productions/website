<template lang="html">
  <aside class="hidden md:block fixed left-0 h-full w-nav-side bg-white nav-side-shadow p-30px z-90">
    <nuxt-link to="/" class="block mb-20px">
      <Logo spin color class="w-full"/>
    </nuxt-link>
    <nav class="font-header font-bold uppercase text-20 leading-09">
      <template v-for="link in links">
        <Link :slice="link"/>
      </template>
    </nav>
  </aside>
</template>

<script>
import Link from '@/slices/Link'
import {mapState} from 'vuex'
export default {
  components:{Link},
  computed:mapState({
    links: state => state.settings.links
  })
}
</script>

<style lang="css">
  .nav-side-shadow{box-shadow: 2px 0px 2px rgba(theme('colors.bluergb'),.25);}
</style>
