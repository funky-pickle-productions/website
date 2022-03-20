<template lang="html">
  <container class="landing h-500px relative overflow-hidden z-20 flex justify-center items-center" ref="trigger">

    <prismic-rich-text v-if="title.length > 0" :field="title" class="font-header font-bold uppercase leading-09 text-70 sm:text-80 text-lime text-center md:text-left"/>

    <div
      v-if="renderImage"
      class="landing-media absolute inset-0 bg-cover bg-bottom z-back-1 image"
      :class="{'opacity-40': title.length > 0}"
      :style="{backgroundImage:`url(${image.url})`}"
    />

    <div v-if="renderVideo" class="landing-media absolute inset-0 z-back-1">
      <ElementVideo :data="video" background ref="video"/>
    </div>

    <div class="absolute inset-0 z-back-2 bg-black"/>
  </container>
</template>

<script>
export default {
  props:{
    image: {type: Object, default: ()=>({})},
    video: {type: Object, default: ()=>({})},
    title: {type: Array, default: ()=>[]}
  },
  data:()=>({
    renderImage: false,
    renderVideo: false
  }),
  mounted(){
    this.renderVideo = !isMobile && this.video.embed_url
    this.renderImage = this.image.url && !this.renderVideo

    this.$nextTick(()=>{
      this.anim = gsap.to('.landing-media',{scale:1.2,ease:'none', scrollTrigger:{
        trigger: this.$refs.trigger.$el,
        scrub: true,
        start: 0,
        end: 'bottom top'
      }})
    })

  },
  destroyed(){
    this.anim && this.anim.kill()
  }
}
</script>
