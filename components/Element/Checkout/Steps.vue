<template lang="html">
  <div class="bg-black text-white font-semibold fill-lime flex flex-row justify-center items-center py-20 px-20 lg:px-40 pointer-events-none">
    <template v-for="(step,i) in steps">
      <div class="flex-auto flex flex-row items-center justify-center text-09 md:text-10" :class="{'opacity-40':active < i && !success}">
        <span v-html="step.label" class="pr-05 md:pr-10"/>
        <div v-if="active <= i && !success" class="rounded-full h-10 w-10 border border-white"/>
        <Icon class="w-10 block" check v-else/>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props:{
    steps:Array,
    active:Number,
    success:Boolean
  }
}
</script>

<style lang="css" scoped>
</style>
