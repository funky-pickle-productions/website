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
      mock: {"variation":"default","name":"Default","slice_type":"carousel","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Envisioneer frictionless paradigms","spans":[]}],"description":[{"type":"paragraph","text":"Et do ullamco deserunt laborum cupidatat quis. Elit eu id minim id. Consectetur eiusmod consequat labore qui sit labore consequat consectetur occaecat consequat veniam.","spans":[]}]},{"image":{"dimensions":{"width":900,"height":500},"alt":"Placeholder image","copyright":null,"url":"https://images.unsplash.com/photo-1600861194802-a2b11076bc51?w=900&h=500&fit=crop"},"link":{"link_type":"Web","url":"https://prismic.io"},"title":[{"type":"heading1","text":"Synthesize cross-platform functionalities","spans":[]}],"description":[{"type":"paragraph","text":"Aute sunt labore sunt minim cillum eu exercitation ea consequat tempor.","spans":[]}]}],"primary":{"publish":false,"title":"deploy cutting-edge e-tailers","description":[{"type":"paragraph","text":"Id exercitation nostrud eu laboris magna nulla consectetur cillum cupidatat ex anim mollit do esse nulla. Est eiusmod adipisicing non duis qui enim dolore laboris. Deserunt enim magna aute sint cillum anim quis mollit.","spans":[]}]},"id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = 'Default'
