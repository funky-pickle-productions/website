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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"email","required":false,"label":"recontextualize dynamic web services","key":"engineer enterprise web services","placeholder":"expedite proactive functionalities","options":"matrix dynamic e-tailers"},{"type":"text","required":false,"label":"aggregate proactive functionalities","key":"mesh back-end models","placeholder":"revolutionize cross-platform systems","options":"scale turn-key blockchains"},{"type":"radio","required":true,"label":"utilize viral blockchains","key":"transform magnetic networks","placeholder":"integrate dynamic e-business","options":"deliver sexy applications"},{"type":"textarea","required":true,"label":"benchmark granular infomediaries","key":"embrace end-to-end networks","placeholder":"enable 24/7 content","options":"target mission-critical infomediaries"}],"primary":{"publish":true,"title":"orchestrate global networks","description":[{"type":"paragraph","text":"Duis sunt eiusmod ut ex quis duis cillum exercitation adipisicing reprehenderit commodo cillum ipsum. Magna et adipisicing non tempor.","spans":[]}],"action":"enhance strategic web-readiness","sheet":"productize B2C deliverables"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
