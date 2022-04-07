import MyComponent from '../../../../slices/Products';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Products'
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
      mock: {"variation":"default","name":"Default","slice_type":"products","items":[{"option":true,"pid":"visualize value-added metrics","key":"enable visionary networks","max":6498,"min":8143},{"option":false,"pid":"syndicate strategic web services","key":"incubate best-of-breed metrics","max":5294,"min":5246},{"option":false,"pid":"embrace impactful partnerships","key":"synthesize compelling infomediaries","max":1584,"min":8521}],"primary":{"title":"incubate front-end web-readiness"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
