<template>
  <section class="event-section">

    <Title v-if="title" :value="title" class="mb-40"/>
    <ElementText v-if="description" :field="description" class="mb-40"/>

    <template v-for="(event,i) in events">

      <nuxt-link :key="i" :to="`/event/${event.uid}`" class="event-item bg-white overflow-hidden mb-10px rounded-lg flex flex-col items-stretch lg:flex-row lg:h-120 graphic-box">

        <div class="relative z-10 h-170 flex-grow-0 flex-shrink-0 flex flex-col justify-center text-center text-white overflow-hidden pb-40 bg-black lg:pb-0 lg:pr-40 lg:h-auto lg:w-150">
          <h3 class="relative z-10 font-header font-bold leading-09 uppercase text-50 lg:text-20">
            <span class="lg:block" v-html="getMonth(event.data.date)" />
            <span class="lg:block lg:text-60" v-html="getDay(event.data.date)" />
          </h3>
          <div
            v-if="event.data.background.url"
            class="event-image absolute inset-0 z-0 bg-cover bg-center opacity-40 image"
            :style="{ backgroundImage: `url(${event.data.background.url})` }"
          />
        </div>

        <div class="reative z-10 flex-grow-0 flex-shrink-0 h-0 flex flex-row justify-center items-center lg:flex-col lg:h-full lg:w-0">
          <div class="relative h-80 w-80 rounded-full bg-lime shadow-bottom overflow-hidden">
            <div
              v-if="event.data.ball.url"
              class="absolute inset-0 bg-cover bg-center image"
              :style="{ backgroundImage: `url(${event.data.ball.url})` }"
            />
          </div>
        </div>

        <div class="flex-auto mt-40 p-25 flex flex-col justify-center lg:mt-0 lg:ml-40 lg:p-20">
          <Marquee>
            <h3 class="event-title px-10 font-header uppercase font-bold text-25 leading-none" v-html="event.data.title" />
          </Marquee>
          <div class="flex flex-row items-center justify-center mt-20 md:mt-10 lg:justify-start" v-if="event.data.city || event.data.state">
            <icon class="mr-05 h-10 fill-pink" wayfinder/>
            <span class="font-semibold text-12 md:text-10" v-html="formatCityState(event.data.city, event.data.state)" />
          </div>
        </div>

      </nuxt-link>

    </template>

    <div v-if="slice.primary.count" class="mt-40 text-center lg:text-left">
      <nuxt-link :to="'/events'" v-html="'View All Events'" class="button button-pink"/>
    </div>

  </section>
</template>

<script>
import { getDay, getMonth } from "@/assets/helpers";
import { mapState } from "vuex";
export default {
  name: "EventsSlice",
  props:['slice'],
  computed: {
    ...mapState({
      eventsData: (state) => state.lists.events,
      weather: state => state.weather
    }),
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    events() {
      if (this.eventsData.length == 0) return [];
      if (this.slice.primary.count) return this.eventsData.slice(0, this.slice.primary.count);
      return this.eventsData;
    },
  },
  methods: {
    getDay,
    getMonth,
    formatCityState(city, state) {
      return city && state ? `${city}, ${state}` : city || state
    },
  }
}
</script>

<style media="screen">
.event-section .event-image {
  transition: transform 0.35s;
  transform: scale(1.2);
}
.event-section .event-title {
  transition: color 0.35s;
}

.event-item:hover .event-title {
  color: theme("colors.pink");
}
.event-item:hover .event-image {
  transform: scale(1.01);
}
</style>
