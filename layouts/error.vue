<template>
  <main class="bg-lime text-pink h-screen flex justify-center items-center text-center">
    <div class="">
      <h1 class="font-header uppercase font-bold text-60 mb-40">Out of Bounds</h1>
      <NuxtLink class="button button-wide bg-pink text-white" to="/">Get Back In The Game</NuxtLink>
    </div>
  </main>
</template>

<script>
export default {
  mounted(){
    this.$bus.$emit('LOADED')
  }
}
</script>
