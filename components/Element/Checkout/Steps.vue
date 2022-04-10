<template lang="html">
  <div class="bg-black text-white font-semibold fill-lime flex flex-row justify-center items-center py-20 px-20 lg:px-40 pointer-events-none">
    <template v-for="(step,i) in steps">
      <div class="flex-auto flex flex-row items-center justify-center">
        <span v-html="step.label" :class="{'opacity-40':active < i && !success}"/>
        <Icon class="ml-10 h-10" check :class="{'opacity-0':active <= i && !success}"/>
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
