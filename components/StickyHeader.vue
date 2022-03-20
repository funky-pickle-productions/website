<template lang="html">
  <div class="relative z-50" ref="spacer" v-if="scrollId" :style="{height:`${height}px`}">
    <header class="absolute inset-0 sticky-header" ref="header">
      <div ref="wrapper" :style="{height:`${height}px`}">
        <slot/>
      </div>
    </header>
  </div>
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
    setTimeout(this.initHeader,500)
  },
  destroyed(){
    this.anim && this.anim.kill()
  },
  methods:{
    initHeader(){
      this.anim = ScrollTrigger.create({
        trigger: this.scrollId,
        start: ()=> `top top-=${getPosition(this.$refs.header).top}`,
        end: ()=> `bottom top+=${this.$refs.header.offsetHeight}`,
        pin: this.$refs.header,
        pinSpacer: this.$refs.spacer,
        pinSpacing: false,
        onToggle:(e)=> this.$bus.$emit('PAUSE_TOP_NAV',e.isActive),
        invalidateOnRefresh:true
      })
    }
  }
}
</script>
