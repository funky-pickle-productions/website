<template lang="html">
  <nav id="mobile-nav" class="md:hidden fixed top-0 left-0 w-full h-full bg-black text-white p-30px z-90 font-header font-bold uppercase text-40 leading-09 flex justify-center items-center">
    <div>
      <template v-for="link in links">
        <Link :slice="link"/>
      </template>
    </div>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
import Link from '@/slices/Link'
export default {
  data:()=>({hide: true}),
  components:{Link},
  watch:{
    hide(h){
      h ? this.closeMenu() : this.openMenu()
    }
  },
  mounted(){
    this.$bus.$on("TOGGLE_MOBILE_NAV",()=> this.hide = !this.hide)
  },
  computed:mapState({
    links: state => state.settings.links
  }),
  methods:{
    handleClick(){
      this.$bus.$emit("TOGGLE_MOBILE_NAV")
    },
    openMenu(){
      this.$bus.$emit('MOBILE_NAV_VISIBLE')
      gsap.to('#mobile-nav',1,{x:0,ease: 'expo.inOut'})
      setTimeout(()=> window.addEventListener('click',this.handleClick),100)
    },
    closeMenu(){
      this.$bus.$emit('MOBILE_NAV_HIDDEN')
      gsap.to('#mobile-nav',1,{x:'-100%',ease: 'expo.inOut'})
      window.removeEventListener('click',this.handleClick)
    }
  }
}
</script>

<style lang="css">
  #mobile-nav{
    transform: translateX(-100%);
  }
</style>
