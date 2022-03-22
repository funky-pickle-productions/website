import pageTransition from '@/assets/pageTransition'

export default{
  transition: pageTransition,
  mounted(){
    this.$bus.$emit('LOADED')
  },
  destroyed(){
    this.$bus.$emit('UNLOADED')
  }
}
