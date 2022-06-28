import MyComponent from '../../../../slices/Form';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Form'
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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":true,"label":"harness cutting-edge markets","key":"revolutionize leading-edge ROI","placeholder":"utilize vertical content","options":"expedite intuitive users"},{"type":"textarea","required":true,"label":"streamline rich users","key":"scale cutting-edge web-readiness","placeholder":"engineer strategic markets","options":"extend back-end communities"},{"type":"text","required":false,"label":"monetize turn-key interfaces","key":"facilitate magnetic platforms","placeholder":"engage best-of-breed portals","options":"synthesize dot-com communities"},{"type":"textarea","required":false,"label":"implement transparent e-business","key":"synthesize clicks-and-mortar solutions","placeholder":"cultivate impactful technologies","options":"innovate synergistic initiatives"}],"primary":{"publish":true,"title":"deliver enterprise functionalities","description":[{"type":"paragraph","text":"Aute velit sint enim labore cillum id magna consectetur amet amet esse velit exercitation. Fugiat ut laborum irure laborum consectetur aliqua eu proident. Commodo enim consequat elit reprehenderit aute magna ipsum.","spans":[]}],"action":"revolutionize seamless niches","sheet":"drive enterprise metrics"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
