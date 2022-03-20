<template lang="html">
  <button
    id="nav__button"
    :class="{}"
    class="hamburger-button md:hidden fixed bottom-30 right-20 z-100 h-70px w-70px rounded-full bg-black flex flex-col justify-center items-center"
    ref="btn"
    @click="$bus.$emit('TOGGLE_MOBILE_NAV')"
  >
    <div v-for="i in 3" class="hamburger h-2px w-40px bg-white my-3px" ref="bar"/>
  </button>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  mounted(){
    this.$bus.$on("MOBILE_NAV_VISIBLE",()=> {
      gsap.timeline()
      .to(this.$refs.bar[0],.75,{rotate:45,y:'390%',ease:'expo.inOut'})
      .to(this.$refs.bar[1],.75,{scale:0,ease:'expo.inOut'},'<')
      .to(this.$refs.bar[2],.75,{rotate:-45,y:'-390%',ease:'expo.inOut'},'<')
      .to(this.$refs.btn,.75,{scale:1.2,background: config.theme.colors.pink, ease:'expo.inOut'},'<')
    })
    this.$bus.$on("MOBILE_NAV_HIDDEN",()=> {
      gsap.timeline()
      .to(this.$refs.bar[0],.75,{rotate:0,y:0,ease:'expo.inOut'},'<')
      .to(this.$refs.bar[1],.75,{scale:1,ease:'expo.inOut'},'<')
      .to(this.$refs.bar[2],.75,{rotate:0,y:0,ease:'expo.inOut'},'<')
      .to(this.$refs.btn,.75,{scale:1,background:config.theme.colors.black,ease:'expo.inOut'},'<')
      .set([this.$refs.bar,this.$refs.btn],{clearProps:'all'})
    })
  }
}
</script>
