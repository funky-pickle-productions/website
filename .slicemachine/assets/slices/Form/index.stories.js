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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"text","required":false,"label":"evolve web-enabled functionalities","key":"reinvent strategic applications","placeholder":"engage viral convergence","options":"productize interactive functionalities"},{"type":"text","required":true,"label":"productize granular blockchains","key":"empower plug-and-play niches","placeholder":"optimize compelling paradigms","options":"exploit mission-critical deliverables"},{"type":"email","required":true,"label":"monetize vertical initiatives","key":"mesh killer portals","placeholder":"innovate best-of-breed paradigms","options":"iterate strategic users"}],"primary":{"publish":true,"title":"synergize 24/7 networks","description":[{"type":"paragraph","text":"Proident do laboris ut ullamco consequat eiusmod ipsum nisi commodo eiusmod amet ad consectetur.","spans":[]}],"action":"exploit cross-platform markets","sheet":"syndicate cutting-edge portals"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
