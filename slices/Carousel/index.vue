<template>
  <section v-if="slides.length > 0" class="carousel-section">

    <Title v-if="title" :value="title" class="mb-40"/>
    <div class="graphic-box rounded-lg bg-white overflow-hidden">
      <div class="p-20" v-if="description">
        <ElementText :field="description"/>
      </div>
      <div class="px-20 pb-20">
        <ElementCarousel :slides="slides" v-slot="{slide}" :options="{slidesPerView: 'auto'}" overflowHidden slideClass="">
          <div class="">
            <div class="pb-400px bg-cover" :style="{backgroundImage:`url('${slide.image.url}')`}"/>
            <div class="bg-white pt-20">
              <ElementText :field="slide.title"/>
              <ElementText :field="slide.description"/>
            </div>
          </div>
        </ElementCarousel>
      </div>
    </div>

  </section>
</template>

<script>
import config from '@/tailwind.config.js'
export default {
  name: "CarouselSlice",
  props: ['slice'],
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    slides(){
      return this.slice.items
    }
  }
};
</script>

<style lang="css">

</style>
