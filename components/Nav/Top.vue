<template lang="html">
  <header id="top-header" class="fixed top-0 left-0 right-0 md:hidden bg-white header-bottom-shadow h-nav-top flex justify-center items-center  z-100">
    <nuxt-link to="/">
      <logo horizontal color spin class="h-50px"/>
    </nuxt-link>
  </header>
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
    }
  },
  created(){
    if (process.server) return
    this.breakpoint = parseInt(config.theme.screens.md)
    window.addEventListener('resize',this.handleResize)
    this.handleResize()

    this.$bus.$on('PAUSE_TOP_NAV',(x) => this.pause = x)
  },
  destroyed(){
    this.off()
    window.removeEventListener('resize',this.handleResize)
  },
  methods:{
    handleResize(){
      window.innerWidth < this.breakpoint && !this.active && this.on()
      window.innerWidth >= this.breakpoint && this.active && this.off()
    },
    handleUpdate(s){
      if(s.direction == -1 && !this.visible) this.showNav()
      if(s.direction == 1 && this.visible) this.hideNav()
    },
    on(){
      this.active = true
      this.$bus.$on('UNLOADED',this.hideNav)
      this.$bus.$on('LOADED',this.delayShowNav)
      this.$bus.$on('MOBILE_NAV_HIDDEN',this.toggleNav)
      this.$bus.$on('MOBILE_NAV_VISIBLE',this.showNav)
      this.anim = gsap.to('#top-header',.5,{y:0,paused: true,ease:'expo.inOut'})
      this.trigger = ScrollTrigger.create({start: 0,end: 99999,onUpdate:this.handleUpdate})
    },
    off(){
      this.active = false
      this.$bus.$off('UNLOADED',this.hideNav)
      this.$bus.$off('LOADED',this.delayShowNav)
      this.$bus.$off('MOBILE_NAV_HIDDEN',this.toggleNav)
      this.$bus.$off('MOBILE_NAV_VISIBLE',this.showNav)
      this.anim && this.anim.kill()
      this.trigger && this.trigger.kill()
    },
    toggleNav(){
      this.visible ? this.showNav() : this.hideNav()
    },
    delayShowNav(){
      setTimeout(this.showNav,1000)
    },
    showNav(){
      this.visible = true
      !this.pause && this.anim && this.anim.play()
    },
    hideNav(){
      this.visible = false
      this.anim && this.anim.reverse()
    }
  }
}
</script>

<style lang="css">
  #top-header{
    transform: translateY(-100%);
  }
  .header-bottom-shadow{box-shadow: 0px 2px 2px rgba(theme('colors.bluergb'),.25);}
</style>
