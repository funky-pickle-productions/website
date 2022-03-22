<template>
<section class="text-section" >
  <Title v-if="title" :value="title" class="mb-40"/>
  <div class="rounded-lg overflow-hidden graphic-box" :class="classes">
    <prismic-image v-if="image" :field="image"/>
    <div class="px-20 py-50 lg:px-50 text-content max-w-800px mx-auto">
      <ElementText :field="text" :calloutColor="callout"/>
    </div>
  </div>
</section>
</template>

<script>

export default {
  name: "TextSlice",
  props: ["slice"],
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    image(){
      return this.slice.primary.image || null
    },
    text(){
      return this.slice.primary.text
    },
    callout(){
      let bg = this.slice.primary.background
      return bg == 'white' || bg == 'lime' || bg == null ? 'pink' : 'lime'
    },
    classes(){
      let bg = this.slice.primary.background
      return{
        'bg-white': bg == 'white' || bg == null,
        'bg-black text-white': bg == 'black',
        'bg-pink text-white': bg == 'pink',
        'bg-green text-white': bg == 'green',
        'bg-lime': bg == 'lime'
      }
    }
  }
}
</script>

<style lang="css">
  .text-section h1{
    text-align: center;
  }
</style>
