<template>
  <section v-if="slides.length > 0" class="carousel-section w-full">

    <Title v-if="title" :value="title" class="mb-40"/>
    <ElementText v-if="description" :field="description" class="mb-40"/>

      <ElementCarousel :slides="slides" v-slot="{slide}" overflowHidden>
        <div class="carousel-item swiper-slide h-auto flex flex-row items-stretch">
          <div class="block bg-white rounded-lg shadow-b-blue h-full flex flex-row flex-wrap items-stretch w-full overflow-hidden">
            <div class="flex-auto min-w-1/2 max-w-full min-h-300px bg-cover bg-center" v-if="slide.image.url" :style="{ backgroundImage: `url(${slide.image.url})` }"/>
            <div class="p-30">
              <ElementText v-if="slide.title.length > 0" :field="slide.title"/>
              <ElementText v-if="slide.description.length > 0" :field="slide.description"/>
            </div>
          </div>
        </div>
      </ElementCarousel>

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
