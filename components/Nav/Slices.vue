<template lang="html">
  <StickyHeader v-if="scrollId" :scrollId="scrollId" :height="height">

      <div class="overflow-hidden h-full" ref="wrapper">

        <div class="flex flex-col md:flex-row relative bg-pink text-white overflow-hidden font-bold" ref="items">

          <div class="nav-slice-menu flex-shrink-0 md:hidden flex flex-row items-center justify-center" @click="toggleMenu" :style="{height:`${height}px`}">
            <span>Menu</span>
            <div class="ml-10 w-30px">
              <div v-for="i in 3" class="hamburger h-2px w-full bg-lime my-3px" ref="bar"/>
            </div>
          </div>

          <template v-for="(item,i) in items">
            <div
              class="nav-slice-item flex-shrink-0 md:flex-auto flex justify-center items-center relative md:border-t-0 border-black border-t"
              :class="{'md:border-l': i > 0}"
              @click="scrollTo(item.id)"
              :style="{height:`${height}px`}"
            >
              <span v-html="item.label"/>
              <span v-html="'❯'" class="ml-10 text-lime"/>
            </div>
          </template>

        </div>

      </div>

  </StickyHeader>
</template>

<script>
export default {
  props:{
    slices:{type:Array,default:()=>[]},
    scrollId:{type:String,default: null}
  },
  data:()=>({
    menuOpen:false,
    height: 70
  }),
  watch:{
    menuOpen(o){
      o && setTimeout(()=> window.addEventListener('click',this.toggleMenu),100)
      !o && window.removeEventListener('click',this.toggleMenu)

      if (o){
          gsap.timeline()
          .to(this.$refs.wrapper,.5,{height: this.$refs.items.offsetHeight,ease:'expo.inOut'})
          .to(this.$refs.bar[0],.5,{rotate:45,y:'250%',ease:'expo.inOut'},'<')
          .to(this.$refs.bar[1],.5,{scale:0,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[2],.5,{rotate:-45,y:'-250%',ease:'expo.inOut'},'<')
      } else {
          gsap.timeline()
          .to(this.$refs.wrapper,.5,{height:this.height,ease:'expo.inOut'})
          .to(this.$refs.bar[0],.5,{rotate:0,y:0,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[1],.5,{scale:1,ease:'expo.inOut'},'<')
          .to(this.$refs.bar[2],.5,{rotate:0,y:0,ease:'expo.inOut'},'<')
          .set(this.$refs.bar,{clearProps:'all'})
          .set(this.$refs.items,{clearProps:'height'})

      }
    }
  },
  computed:{
    items(){
      let items = []
      this.slices.forEach(s => {
        if(s.primary.title  && typeof s.primary.title == 'string'){
          items.push({label: s.primary.title,id:s.id})
        }
      })
      return items
    }
  },
  methods:{
    toggleMenu(){
      this.menuOpen = !this.menuOpen
    },
    scrollTo(id){
      let el = document.getElementById(id).childNodes[0]
      gsap.to(window,1,{ease: 'power2.out', scrollTo:{y:el,offsetY: this.height + 50}})
    }
  }

}
</script>

<style media="screen">
  .nav-slice-item,
  .nav-slice-menu{
    cursor: pointer;
  }
  .nav-slice-item:hover{
    background: theme('colors.lime');
  }
  .nav-slice-item:hover span{
    color: theme('colors.black');
  }
</style>
