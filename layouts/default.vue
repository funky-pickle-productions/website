<template lang="html">
  <div id="site" class="md:pl-nav-side">

    <Preloader/>
    <NavTop/>
    <NavMobile/>
    <NavSide/>
    <NavButton/>
    <nuxt/>
    <Signup/>
    <EndMatter/>
    <div id="cover" class="hidden fixed inset-0 z-80"/>

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
  }
}
</script>
