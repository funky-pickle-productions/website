<template lang="html">
  <div class="bios-section">
    <div class="bg-white rounded-lg graphic-box overflow-hidden flex flex-col lg:flex-row">

      <div class="flex-initial flex flex-row md:flex-col">
        <div v-for="c in colors" class="h-20 md:h-auto md:w-10 flex-auto" :class="`bg-${c}`"/>
      </div>

      <div class="flex flex-col md:flex-row p-30">
        <div class="flex-initial mb-30 md:mb-0 md:mr-30">
          <h3 v-html="slice.primary.name" class="font-header font-bold uppercase leading-09 text-pink text-50 md:text-30 min-w-100" />
        </div>
        <div class="flex-auto">
          <ElementText :field="slice.primary.text" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BiosSlice',
  props:['slice'],
  data:()=>({
    colors: ['black','pink','green']
  })
}
</script>

<style media="screen">
.text-section + .bios-section.pt-space-2x,
.bios-section + .bios-section.pt-space-2x{
  padding-top: theme('spacing.space')
}
</style>
