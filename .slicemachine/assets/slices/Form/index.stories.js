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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":false,"label":"reinvent B2C initiatives","key":"benchmark end-to-end eyeballs","placeholder":"mesh front-end web services","options":"orchestrate visionary architectures"},{"type":"email","required":false,"label":"repurpose out-of-the-box interfaces","key":"mesh real-time action-items","placeholder":"scale back-end web-readiness","options":"orchestrate wireless interfaces"},{"type":"email","required":false,"label":"productize extensible communities","key":"incubate synergistic markets","placeholder":"architect impactful e-business","options":"engage frictionless e-services"},{"type":"radio","required":false,"label":"visualize plug-and-play systems","key":"monetize innovative architectures","placeholder":"leverage magnetic schemas","options":"recontextualize user-centric blockchains"},{"type":"select","required":true,"label":"e-enable innovative channels","key":"enable customized blockchains","placeholder":"deploy strategic communities","options":"transition cutting-edge infrastructures"}],"primary":{"publish":true,"title":"enable cutting-edge portals","description":[{"type":"paragraph","text":"Irure velit et anim exercitation voluptate minim nulla ex cillum consectetur magna. Enim sint ea non Lorem non fugiat velit ullamco qui deserunt anim.","spans":[]}],"action":"engineer user-centric relationships"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
