<template lang="html">
  <div class="intro-section overflow-hidden bg-white pb-space-2x">
      <div class="relative z-10 py-space w-full" ref="trigger">

        <prismic-rich-text :field="slice.primary.title" class="intro-title font-header font-bold uppercase leading-09 text-center lg:text-left"/>

        <div class="absolute inset-0 flex flex-row justify-center lg:justify-end z-back-1">
          <icon ball ref="ball" class="flex-shrink-0 h-full fill-lime"/>
        </div>

    </div>
  </div>
</template>

<script>
export default {
  name:"IntroSlice",
  props:['slice'],
  mounted(){
    setTimeout(this.initAnim,500)
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  methods:{
    initAnim(){
      this.anim = gsap.to(this.$refs.ball.$el,{rotate:180,ease:'none',force3D:true,scrollTrigger:{
        trigger: this.$refs.trigger,
        scrub: 1,
        start: 0,
        end: 'bottom top',
      }})
    }
  }
}
</script>

<style lang="css">

  .intro-section{
    box-shadow: 0px 2px 5px rgba(theme('colors.bluergb'),.1)
  }
  .intro-title{
    font-size: 15vw
  }
  .intro-title strong{
    color: theme('colors.pink');
  }
  @media screen and (min-width: theme('screens.sm')){
    .intro-title{
      font-size: 3.5rem;
    }
  }
  @media screen and (min-width: theme('screens.md')){
    .intro-title{
      font-size: calc((100vw - theme('spacing.nav-side')) / 14 );
    }
  }
</style>
