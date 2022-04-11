<template lang="html">
  <div class="carousel-element" v-if="slides">
    <div class="relative">
      <div class="swiper z-10" ref="swiper" :class="{'overflow-hidden':overflowHidden}">
        <div class="swiper-wrapper h-auto items-stretch relative">

          <template v-for="(slide,i) in slides">
            <div class="swiper-slide h-auto" :class="slideClass">
              <slot :slide="{...slide,slideIndex:i}"/>
            </div>
          </template>

        </div>
      </div>

      <div class="hidden md:block prev-button absolute z-20 left-0 top-1/2 -mt-25px -ml-25px">
        <button v-html="'❮'" class="h-50px w-50px rounded-full bg-black text-white flex justify-center items-center"/>
      </div>

      <div class="hidden md:block next-button absolute z-20 right-0 top-1/2 -mt-25px -mr-25px">
        <button v-html="'❯'" class="h-50px w-50px rounded-full bg-black text-white flex justify-center items-center"/>
      </div>
    </div>
    <div class="text-center dots mt-20"/>
  </div>
</template>

<script>
export default {
  props:{
    slides:{type:Array,default:null},
    options:{type:Object,default:()=>({})},
    overflowHidden:Boolean,
    slideClass:{type:String,default:null},
  },
  mounted(){

    if (!this.slides) return

    let defaultOptions = {
      slidesPerView: 'auto',
      spaceBetween:10,
      longSwipesRatio: .1,
    }

    this.swiper = new Swiper(this.$refs.swiper, {
      ...defaultOptions,
      ...this.options,
      pagination: {
        el: '.dots',
        type: 'bullets',
        clickable:true,
      },
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button',
      },
    });
  }
}
</script>

<style lang="css">

.swiper{
  overflow: visible;
}

.swiper-pagination-bullet{
  background: theme('colors.black');
  opacity: 1;
  height: 8px;
  width:8px;
  border-radius: 50%;
  margin:0px 5px;
}
.swiper-pagination-bullet-active{
  background: theme('colors.pink');
}

.swiper.overflow-hidden{
  overflow:hidden;
}

.carousel-element .prev-button button,
.carousel-element .next-button button{
  transform: scale(1.001);
  transition: transform .2s, background .2s;
}

.carousel-element .prev-button:hover button,
.carousel-element .next-button:hover button{
  transform: scale(1.2);
}

.carousel-element .prev-button:active button,
.carousel-element .next-button:active button{
  transform: scale(.9);
}
</style>
