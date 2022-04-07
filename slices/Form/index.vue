<template lang="html">
  <section class="form-section">
    <div :class="{'rounded-lg overflow-hidden graphic-box': !inline}">

      <div v-if="title" class="pl-20 md:pl-50 p-10 bg-lime border-b border-black">
        <h3 v-html="title" class="font-header uppercase text-25"/>
      </div>

      <div :class="{'bg-white p-20 md:px-50 md:py-40':!inline}">
        <prismic-rich-text v-if="description" :field="description" class="mb-30 font-bold text-15"/>
        <ElementForm v-if="!$slots.default" :fields="slice.items" :action="slice.primary.action" :multiColumn="!slice.primary.inline"/>
        <ElementForm v-else :fields="slice.items" :multiColumn="!slice.primary.inline" @submit="$emit('submit',$event)">
          <slot/>
        </ElementForm>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name:"FormSlice",
  props:['slice'],
  computed:{
    inline(){
      return this.slice.primary.inline
    },
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    }
  }
}
</script>

<style media="screen">
.text-section + .form-section.pt-space-2x,
.form-section + .form-section.pt-space-2x{
  padding-top: theme('spacing.space')
}
</style>
