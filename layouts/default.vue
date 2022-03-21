<template lang="html">
  <div id="site" class="md:pl-nav-side">
    <Preloader/>
    <NavTop/>
    <NavMobile/>
    <NavSide/>
    <NavButton/>
    <div class="relative">
      <nuxt/>
    </div>
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
  computed:{
    pages(){
      if(!this.$store.state.settings.links) return {}
      let pages = {'/':1}
      this.$store.state.settings.links.forEach((l,i) => {
        pages[`/${l.primary.link.uid}`] = i + 2
      })
      return pages
    }
  }
}
</script>
