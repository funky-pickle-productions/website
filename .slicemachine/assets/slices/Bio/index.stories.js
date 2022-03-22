import MyComponent from '../../../../slices/Bio';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Bio'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","name":"Default","slice_type":"bio","items":[],"primary":{"publish":false,"name":"revolutionize one-to-one vortals","text":[{"type":"paragraph","text":"Exercitation adipisicing commodo cupidatat laboris et duis Lorem eiusmod incididunt consectetur laborum minim et ad.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
