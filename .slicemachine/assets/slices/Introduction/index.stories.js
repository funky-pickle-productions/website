import MyComponent from '../../../../slices/Introduction';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Introduction'
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
      mock: {"variation":"default","name":"Default","slice_type":"introduction","items":[],"primary":{"publish":true,"title":[{"type":"heading1","text":"Productize plug-and-play portals","spans":[]}],"background":"black"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
