<template lang="html">
  <nav id="top-nav" class="fixed top-0 left-0 right-0 md:hidden bg-white nav-bottom-shadow h-nav-top flex justify-center items-center  z-100">
    <nuxt-link to="/">
      <logo horizontal color spin class="h-50px"/>
    </nuxt-link>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
import config from '@/tailwind.config.js'
export default {
  data:()=>({
    visible: false,
    pause: false,
    active:false
  }),
  watch:{
    pause(pause){
      pause ? this.hideNav() : this.toggleNav()
    },
    active(active){
      active ? this.on() : this.off()
    }
  },
  mounted(){
    this.breakpoint = parseInt(config.theme.screens.md)
    window.addEventListener('resize',this.handleResize)
    this.handleResize()

    this.$bus.$on('PAUSE_TOP_NAV',(x) => this.pause = x)
  },
  methods:{
    handleResize(){
      this.active = window.innerWidth < this.breakpoint
    },
    handleUpdate(s){
      if(s.direction == -1 && !this.visible) this.showNav()
      if(s.direction == 1 && this.visible) this.hideNav()
    },
    on(){
      this.$bus.$on('UNLOADED',this.hideNav)
      this.$bus.$on('LOADED',this.showNav)
      this.$bus.$on('MOBILE_NAV_HIDDEN',this.toggleNav)
      this.$bus.$on('MOBILE_NAV_VISIBLE',this.showNav)
      this.anim = gsap.to('#top-nav',.5,{y:0,paused: true,ease:'expo.inOut'})
      this.trigger = ScrollTrigger.create({start: 0,end: 99999,onUpdate:this.handleUpdate})
      this.showNav()
    },
    off(){
      this.$bus.$off('UNLOADED',this.hideNav)
      this.$bus.$off('LOADED',this.showNav)
      this.$bus.$off('MOBILE_NAV_HIDDEN',this.toggleNav)
      this.$bus.$off('MOBILE_NAV_VISIBLE',this.showNav)
      this.anim && this.anim.kill()
      this.trigger && this.trigger.kill()
    },
    toggleNav(){
      this.visible ? this.showNav() : this.hideNav()
    },
    showNav(){
      this.visible = true
      this.anim && this.anim.play()
    },
    hideNav(){
      this.visible = false
      this.anim && this.anim.reverse()
    }
  }
}
</script>

<style lang="css">
  #top-nav{
    transform: translateY(-100%);
  }
  .nav-bottom-shadow{box-shadow: 0px 2px 2px rgba(theme('colors.bluergb'),.25);}
</style>
