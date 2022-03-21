<template lang="html">
  <EventWidget class="flex justify-center items-center">
    <div class="flex flex-row items-center px-10">
      <Icon calendar class="pr-10 h-20 "/>
      <h3 class="font-bold text-13 md:text-16" v-html="data.start"/>
    </div>
  </EventWidget>
</template>

<script>
import {formatDate} from '@/assets/helpers'
export default {
  props:['date'],
  computed:{
    data(){
      return{
        start:formatDate(this.date,'dddd, mmmm dd, yyyy')
      }
    }
  }
}
</script>
