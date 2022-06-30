<template lang="html">
  <section v-if="render" class="landing-section h-500px relative overflow-hidden z-20 flex justify-center items-center gutters" ref="trigger">

    <prismic-rich-text v-if="title.length > 0" :field="title" class="relative z-10 font-header font-bold uppercase leading-09 text-70 sm:text-80 text-lime text-center md:text-left"/>

    <div class="bg-fade-v absolute inset-0" style="opacity:.5"/>

    <div
      v-if="renderImage && svg.url"
      class="landing-media absolute inset-0 -top-100px bg-cover bg-bottom z-back-1 image"
      :style="{backgroundImage:`url(${svg.url})`}"
    />

    <div
      v-else-if="renderImage && image.url"
      class="landing-media absolute inset-0 -top-100px bg-cover bg-bottom z-back-1 image"
      :style="{backgroundImage:`url(${image.url})`}"
    />

    <div v-if="renderVideo" class="landing-media absolute inset-0 -top-100px z-back-1">
      <ElementVideo :data="video" background ref="video"/>
    </div>

  </section>
</template>

<script>
export default {
  props:{
    image: {type: Object, default: ()=>({})},
    video: {type: Object, default: ()=>({})},
    title: {type: Array, default: ()=>[]},
    svg:{type: Object,default: ()=>({})}
  },
  data:()=>({
    renderImage: false,
    renderVideo: false
  }),
  mounted(){
    let hasImage = this.image.url || this.svg.url
    this.renderVideo = !isMobile && this.video.embed_url
    this.renderImage = hasImage && !this.renderVideo

    if (!isMobile && this.render){
      this.$nextTick(()=>{
        this.anim = gsap.to('.landing-media',{y:100,ease:'none',force3D:true, scrollTrigger:{
          trigger: this.$refs.trigger,
          scrub: true,
          start: 0,
          end: 'bottom top'
        }})
      })
    }

  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  computed:{
    render(){
      let {image,video,title,svg} = this
      let render = false
      if(image.url || svg.url) render = true
      if(Array.isArray(title) && title.length && (title.length > 1 || title[0].text != "")) render = true
      if(Object.keys(video).length > 0) render = true
      return render
    }
  }
}
</script>

<style lang="css">
.landing-section{
  padding-top: theme('spacing.nav-top');
}

@media screen and (min-width:theme('screens.md')){
  .landing-section{
    padding-top:0px;
  }
}
</style>
