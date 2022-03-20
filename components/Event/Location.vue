<template lang="html">
  <EventWidget full class="flex flex-row flex-wrap items-center justify-center">
    <div class="flex-initial p-20 text-center">
      <div class="flex flex-row items-center mb-05" v-if="venue">
        <Icon wayfinder  class="pr-10 h-20"/>
        <h3 v-html="venue" class="text-13 md:text-16 font-bold"></h3>
      </div>
      <div class="font-normal">
        <p v-if="address" v-html="address"/>
        <p v-if="cityState" v-html="cityState"/>
      </div>
    </div>
    <div v-if="map" class="location-map flex-grow flex-shrink-0 xl:mt-0">
      <div id="map" class="w-full min-w-300px h-400px rounded-md overflow-hidden"/>
    </div>
  </EventWidget>
</template>

<script>
export default {
  props:['map','address','venue','city','state'],
  head() {
    return {
      link: [{ rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css" }],
      script: [
        { type: "text/javascript", src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet-src.min.js" }
      ],
    };
  },
  mounted(){
    if(this.map) setTimeout(this.initMap, 1000);
  },
  computed:{
    cityState(){
      let cityState = []
      if(this.city) cityState.push(this.city)
      if(this.state) cityState.push(this.state)
      return cityState.length > 0 ? cityState.join(', ') : null
    }
  },
  methods:{
    initMap() {
      let lat = this.map.latitude;
      let lon = this.map.longitude;
      let attribution= ""
      attribution +=`© <a href="https://stadiamaps.com/">Stadia Maps</a>,`
      attribution += `© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>`;

      let map = new L.Map("map", {
        center: new L.LatLng(lat, lon),
        zoom: 16,
        touchZoom: false,
        scrollWheelZoom: false
      });

      let marker = L.marker([lat, lon]).addTo(map);

      let tiles = L.tileLayer("https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png", {
        attribution,
        subdomains: "abcd",
        minZoom: 12,
        maxZoom: 17
      });

      map.addLayer(tiles);

      setTimeout(map.invalidateSize, 1500);
    }
  }
}
</script>

<style media="screen">
  .leaflet-control-attribution{
    font-size: 8px;
  }
</style>
