<template lang="html">
  <header v-if="scrollId" class="sticky-header z-80" ref="header" :style="{height:`${height}px`}">
    <slot/>
  </header>
</template>

<script>
import {getPosition} from '@/assets/helpers'
export default {
  props:{
    scrollId: {type: String, default: null},
    height: {type: Number, default: 70}
  },
  mounted(){
    if (!this.scrollId) return

    this.anim = ScrollTrigger.create({
      trigger: this.scrollId,
      start: ()=> `top top-=${getPosition(this.$refs.header).top}`,
      end: ()=> `bottom top+=${this.$refs.header.offsetHeight}`,
      pin: this.$refs.header,
      pinSpacing: false,
      onToggle:(e)=> this.$bus.$emit('PAUSE_TOP_NAV',e.isActive),
      invalidateOnRefresh:true
    })

    setTimeout(()=> ScrollTrigger.refresh,500)

  },
  destroyed(){
    this.anim && this.anim.kill()
  }
}
</script>
