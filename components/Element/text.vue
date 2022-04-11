<template lang="html">
  <prismic-rich-text class="text-element" :field="field" :htmlSerializer="serializer"/>
</template>

<script>
export default {
  props:['field','calloutColor'],
  methods:{
    serializer(type, element, content, children,item){

      switch(type){
        case 'heading1':
        return `<h1 class="text-40 mb-35 font-bold font-header uppercase leading-09">${children}</h1>`
        case 'heading2':
        return `<h2 class="text-30 mb-35 font-bold font-header uppercase leading-10">${children.join('')}</h2>`
        case 'heading3':
        return `<h3 class="text-25 mb-30 font-bold font-header uppercase leading-10">${children.join('')}</h3>`
        case 'heading4':
        return `<h4 class="text-15 md:text-16 mb-20 font-semibold">${children.join('')}</h4>`
        case 'heading5':
        return `<h5 class="text-14 md:text-15 mb-20 font-semibold">${children.join('')}</h5>`
        case 'heading6':
        return `<h6 class="text-13 md:text-14 mt-20 font-semibold">${children.join('')}</h6>`
        case 'paragraph':
        return `<p class="mb-15">${children.join('')}</p>`
        case 'span':
        return content
        case 'hyperlink':
        return `<a href="${element.data.url}" target="${element.data.target}" class="font-semibold underline text-${this.calloutColor || 'pink'}">${children.join('')}</a>`
        case 'list-item':
        return `<li class="list-disc ml-10 pl-05 marker:text-${this.calloutColor || 'pink'} font-medium">${children.join('')}</li>`
        case "group-list-item":
        return `<ul class="my-20">${children.join('')}</ul>`
        case "strong":
        return `<span class="text-${this.calloutColor || 'pink'} font-bold">${content}</span>`
      }
      return null
    }
  }
}
</script>

<style lang="css">
  .text-element h1:last-child,
  .text-element h2:last-child,
  .text-element h3:last-child,
  .text-element h4:last-child,
  .text-element h5:last-child,
  .text-element h6:last-child,
  .text-element p:last-child{
    margin-bottom: 0px;
  }
</style>
