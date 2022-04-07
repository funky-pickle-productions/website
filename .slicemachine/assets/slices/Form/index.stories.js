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
      mock: {"variation":"default","name":"Default","slice_type":"form","items":[{"type":"select","required":false,"label":"revolutionize 24/365 convergence","key":"evolve extensible infomediaries","placeholder":"strategize impactful infrastructures","options":"target end-to-end portals"},{"type":"text","required":false,"label":"reinvent granular web services","key":"transition transparent partnerships","placeholder":"productize ubiquitous networks","options":"expedite dot-com ROI"},{"type":"text","required":true,"label":"utilize killer experiences","key":"e-enable compelling supply-chains","placeholder":"deliver e-business deliverables","options":"repurpose dot-com schemas"}],"primary":{"publish":true,"title":"drive sexy web services","description":[{"type":"paragraph","text":"Ea deserunt commodo commodo. Cillum ea consequat aliquip sunt ullamco. Mollit eiusmod culpa aliquip culpa do nulla anim ex nisi laborum sit do exercitation.","spans":[]}],"action":"deliver intuitive schemas"},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
