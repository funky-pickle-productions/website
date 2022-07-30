<template lang="html">
  <div class="graphic-box rounded-lg bg-white overflow-hidden">
    <div class="fill-white text-white bg-black">

      <Marquee v-if="weatherData">
        <div class="p-10 px-20 flex flex-row items-center">
          <icon :icon="weatherData.icon" class="inline-block w-20"/>
          <h3 v-html="weatherData.temp" class="font-bold ml-10"/>
          <Label class="ml-10">Feels Like:</Label>
          <h3 class="ml-10 font-bold" v-html="weatherData.feels"/>
          <Label class="ml-10">Description:</Label>
          <h3 class="ml-10 font-bold" v-html="weatherData.description"/>
        </div>
      </Marquee>

    </div>
    <div class="flex flex-row flex-wrap items-center justify-center ">
      <div class="flex-initial py-20 px-30 text-center">
        <div class="flex flex-row items-center mb-05" v-if="venue">
          <Icon wayfinder  class="pr-10 h-20" :style="{fill:color}"/>
          <h3 v-html="venue" class="text-13 md:text-16 font-bold"></h3>
        </div>
        <div class="font-normal">
          <p v-if="address" v-html="address"/>
          <p v-if="cityState" v-html="cityState"/>
        </div>
      </div>
      <div v-if="map" id="map" class="min-w-300px h-400px flex-grow flex-shrink-0"/>
    </div>
  </div>
</template>

<script>
import {getTemp} from "@/assets/helpers";
export default {
  props:{
    map:{type:Object,default:null},
    address:{type:String,default:null},
    venue:{type:String,default:null},
    city:{type:String,default:null},
    state:{type:String,default:null},
    uid:{type:String,default:null},
    color:{type:String,default:null}
  },
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
    },
    weather(){
      return this.$store.state.weather[this.uid] || null
    },
    weatherData(){
      if(!this.weather) return null
      return{
        icon:this.weather.weather[0].icon,
        temp:getTemp(this.weather.main.temp),
        feels:getTemp(this.weather.main.feels_like),
        description:this.weather.weather[0].main
      }
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
