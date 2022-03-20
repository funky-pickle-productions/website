<template lang="html">
  <component :is="useContainer ? 'Container' : 'div'" :id="slice.id || null" class="form-section">
    <div :class="{'rounded-lg overflow-hidden graphic-box': !inline}">

      <div v-if="title" class="pl-20 md:pl-50 p-10 bg-lime border-b border-black">
        <h3 v-html="title" class="font-header uppercase text-25"/>
      </div>

      <div :class="{'bg-white p-20 md:px-50 md:py-40':!inline}">
        <prismic-rich-text v-if="description" :field="description" class="mb-30 font-bold text-15"/>
        <ElementForm :fields="slice.items" :action="this.slice.primary.action" :multiColumn="!this.slice.primary.inline"/>
      </div>

    </div>
  </component>
</template>

<script>
export default {
  name:"FormSlice",
  props:['slice','useContainer'],
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
