import pageTransition from '@/assets/pageTransition'

export default{
  transition: pageTransition,
  mounted(){
    console.log(this)
    this.$bus.$emit('LOADED')
  },
  destroyed(){
    this.$bus.$emit('UNLOADED')
  }
}
