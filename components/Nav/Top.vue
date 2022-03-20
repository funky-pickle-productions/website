<template lang="html">
  <nav id="top-nav" class="fixed top-0 left-0 right-0 md:hidden bg-white nav-bottom-shadow py-10 flex justify-center z-100">
    <nuxt-link to="/">
      <logo horizontal color spin class="h-50px"/>
    </nuxt-link>
  </nav>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    hide: true,
    pause: false
  }),
  watch:{
    pause(p){
      this.hide = p
      this.toggleTopNav()
    },
    hide(){
      this.toggleTopNav()
    },
    $route(){
      this.pause = false
    }
  },
  mounted(){
    this.$bus.$once('REVEAL',()=> this.hide = false)
    this.$bus.$on('PAUSE_TOP_NAV',(x)=> this.pause = x)
    this.$bus.$on('MOBILE_NAV_VISIBLE',()=> this.anim.play())
    this.$bus.$on('MOBILE_NAV_HIDDEN',this.toggleTopNav)

    this.anim = gsap.to('#top-nav',1,{y:0,ease: 'expo.inOut',paused: true})

    this.trigger = ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate:(s)=> (this.hide = s.direction == 1)
    })
  },
  methods:{
    toggleTopNav(){
      this.anim[this.hide || this.pause ? 'reverse' : 'play']()
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
