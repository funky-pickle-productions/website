<template lang="html">
  <div id="site" class="md:pl-nav-side">
    <Preloader/>

    <NavTop/>
    <NavMobile/>
    <NavSide/>
    <NavButton/>

    <transition mode="out-in" @leave="leave" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <nuxt :key="$route.path"/>
    </transition>

    <Signup/>
    <EndMatter/>

  </div>
</template>

<script>
export default {
  created(){
    if (process.server) return
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(ScrollToPlugin);

    let timeout = null
    let html = document.documentElement

    window.addEventListener('resize',()=>{
      timeout && clearTimeout(timeout)
      timeout = setTimeout(()=> html.classList.remove('is-resizing'),100)
      html.classList.add('is-resizing')
    })
  },
  mounted(){
    document.documentElement.style.opacity = 1
  },
  data:()=>({
    to:null,
    from:null,
  }),
  watch:{
    $route(t,f){
      let val = 50
      let from = this.pages[f.path] || 0
      let to = this.pages[t.path] || 0

      if (!to){
        this.from = {x:-val}
        this.to = {x:val}
      } else if (!from) {
        this.from = {x:val}
        this.to = {x:!val}
      } else {
        this.from = {y:from > to ? val : -val}
        this.to = {y:from > to ? -val : val}
      }

    }
  },
  computed:{
    pages(){
      if(!this.$store.state.settings.links) return {}
      let pages = {'/':1}
      this.$store.state.settings.links.forEach((l,i) => {
        pages[`/${l.primary.link.uid}`] = i + 2
      })
      return pages
    }
  },
  methods:{
    leave(el,done){
      gsap.to(el,.5,{...this.from,ease:'power2.in',opacity:0,onComplete:done})
    },
    beforeEnter(el){
      gsap.set(el,{...this.to,opacity:0})
    },
    enter(el,done){
      let images = document.querySelectorAll('.image')
      this.$loaded(images,{background: true},()=>{
        window.scrollTo(0,0)
        gsap.to(el,.5,{x:0,y:0,opacity:1,ease:'power2.out',onComplete:done})
      })
    },
    afterEnter(el){
      gsap.set(el,{clearProps:'all'})
    }
  }
}
</script>
