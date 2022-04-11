<template lang="html">
  <div class="mt-40 text-center">
    <button class="button button-grow md:max-w-200" type="submit" name="submit" v-html="value" @click="$emit('clicked')" :style="{background: color || null}"/>
  </div>
</template>

<script>
export default {
  props:{
    value:String,
    color: String
  }
}
</script>
