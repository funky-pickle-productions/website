<template>
  <section v-if="slides.length > 0" class="press-section overflow-hidden">

    <Title v-if="title" :value="title" class="mb-40"/>
    <prismic-rich-text v-if="description" :field="description" class="mb-40"/>

    <ElementCarousel :slides="slides" v-slot="{slide}">
      <div class="press-item swiper-slide h-full min-h-300 flex flex-row items-stretch">
        <a :href="slide.link.url" target="_blank" class="block overflow-hidden rounded-lg h-full bg-lime flex flex-col lg:flex-row items-stretch w-full graphic-box">
          <div class="flex-shrink-0 flex-grow-0 overflow-hidden pb-2/3 lg:pb-0 lg:w-1/2 relative">
            <div class="press-image absolute inset-0 bg-cover bg-center image" :style="{ backgroundImage: `url(${slide.image.url})` }" />
          </div>
          <div class="p-20 flex flex-col flex-auto text-14 lg:text-10 font-medium">
            <p v-html="formatDate(slide.date,'mmmm dd, yyyy')" class="mb-05"/>
            <div class="press-title text-30 lg:text-25 font-header font-bold uppercase leading-09 flex-auto">
              <prismic-rich-text :field="slide.headline"/>
            </div>
            <i><p v-html="slide.source" class="mt-20"/></i>
          </div>
        </a>
      </div>
    </ElementCarousel>

  </section>
</template>

<script>
import {formatDate} from '@/assets/helpers'
import config from '@/tailwind.config.js'
export default {
  name: "PressSlice",
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
  },
  methods:{formatDate}
};
</script>

<style lang="css">

  .press-title{
    transition: color .25s;
  }

  .is-desktop .press-image{
    transform: scale(1.05);
    transition: transform .25s;
  }

  .is-desktop .press-item:hover .press-title{
    color: theme('colors.pink');
  }

  .is-desktop .press-item:hover .press-image{
    transform: scale(1.01);
  }

</style>
