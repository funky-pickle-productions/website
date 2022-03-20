<template lang="html">
  <div ref="container" class="video-element w-full h-full flex justify-center items-center">
    <iframe ref="frame" class="vimeo-video flex-shrink-0" :src="url" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" :allowfullscreen="!background" ></iframe>
  </div>
</template>
<script>
export default {
  props:{
    data: Object,
    background: Boolean,
  },
  mounted(){
    this.frame = this.$refs.frame.contentWindow

    this.anim = ScrollTrigger.create({
      trigger:this.$refs.container,
      start:'top bottom',
      end: 'bottom top',
      onEnter: this.play,
      onLeave: this.pause,
      onEnterBack: this.play,
      onLeaveBack: this.pause,
    })

  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  computed:{
    url(){
      return `${this.data.embed_url}${this.background ? '?background=1' : ''}`
    }
  },
  methods:{
    play(){
      this.frame.postMessage('{"method":"play"}', '*')
    },
    pause(){
      this.frame.postMessage('{"method":"pause"}', '*')
    }
  }
}
</script>

<style lang="css">
.video-element iframe {
  height: 100vh;
  width: 100vw;
}
@media (min-aspect-ratio: 16/9) {
  .video-element iframe {
    /* height = 100 * (9 / 16) = 56.25 */
    height: 56.25vw;
  }
}
@media (max-aspect-ratio: 16/9) {
  .video-element iframe {
    /* width = 100 / (9 / 16) = 177.777777 */
    width: 177.78vh;
  }
}
</style>
