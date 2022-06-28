<template>
  <div>
    <ElementForm :fields="[{label:'label',type:'checkbox',options:'a,b,c,d'}]"/>
  </div>
</template>

<script>
import mixins from "@/mixins/mixins";
export default {
  mixins: [mixins],
  props:{},
  data:()=>({})
}
</script>

<style></style>
