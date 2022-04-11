import MyComponent from '../../../../slices/Carousel';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Carousel'
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
      mock: {"variation":"default","name":"Default","slice_type":"carousel","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"http://twitter.com"},"title":[{"type":"heading1","text":"Productize enterprise experiences","spans":[]}],"description":[{"type":"paragraph","text":"Duis ad dolore amet laborum aliquip magna laborum excepteur labore aute fugiat culpa. Enim pariatur enim enim pariatur.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1586952518485-11b180e92764?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Evolve sexy interfaces","spans":[]}],"description":[{"type":"paragraph","text":"Sit minim Lorem exercitation quis adipisicing sunt elit adipisicing pariatur adipisicing exercitation aliqua ad duis.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1579931794097-0ad001e51edb?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Benchmark sticky systems","spans":[]}],"description":[{"type":"paragraph","text":"Enim est qui labore esse non incididunt occaecat qui amet dolor eu eu occaecat id proident. Anim dolore reprehenderit ullamco incididunt eu occaecat duis aliqua exercitation deserunt irure aute eu esse ad.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1560762484-813fc97650a0?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://slicemachine.dev"},"title":[{"type":"heading1","text":"Deliver rich architectures","spans":[]}],"description":[{"type":"paragraph","text":"Nostrud laborum veniam aute eu. Velit ut ullamco proident laboris adipisicing do dolor deserunt est laborum exercitation.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1587905069134-008460d7a636?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Optimize bleeding-edge web-readiness","spans":[]}],"description":[{"type":"paragraph","text":"Et deserunt amet culpa Lorem exercitation ad amet excepteur magna nulla nostrud reprehenderit id consectetur incididunt. Exercitation minim do duis ipsum proident cupidatat occaecat laborum tempor ullamco nulla cupidatat excepteur consectetur aute.","spans":[]}]}],"primary":{"publish":true,"title":"transform leading-edge convergence","description":[{"type":"paragraph","text":"Velit et velit irure nulla labore in ipsum do sit voluptate dolore adipisicing magna. Deserunt sunt nisi consectetur est aliquip commodo amet.","spans":[]}],"vertical":true},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
