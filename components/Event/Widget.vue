<template lang="html">
  <div class="relative z-10 rounded-lg bg-white graphic-box overflow-hidden" :class="{'p-10':!full}">
    <slot/>
  </div>
</template>

<script>
export default {
  props:{
    full:Boolean
  }
}
</script>
