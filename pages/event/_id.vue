<template lang="html">
  <main id="event" ref="page">
    <div class="bg-white relative z-50">
      <div class="relative z-10 pt-300px md:pt-200px">
        <div class="absolute inset-0 -bottom-100px md:-bottom-100 overflow-hidden">
          <Landing :image="data.background" />
        </div>
      </div>

      <div class="relative z-20 gutters">
        <prismic-image :field="data.banner" class="rounded-lg graphic-box" />
      </div>

      <div class="gutters py-space">
        <h1 v-html="data.title" class="font-header font-bold text-center uppercase leading-09 text-30 md:text-50"/>
      </div>

      <StickyHeader scrollId="#event" :height="90">
        <div
          class="h-full font-bold flex justify-center items-center"
          :style="{ background: data.primary || null }"
          ref="stickyHeader"
        >
          <template v-if="data.checkout.length > 0">
            <template v-for="link in data.checkout">
              <nuxt-link
                class="flex-auto max-w-150 text-center button button-lime mx-05"
                v-html="link.label"
                :to="{path:`/checkout/${link.link.uid}`,query:{type:'event',uid}}"
              />
            </template>
          </template>
          <h3 v-else class="text-white text-16">Registration Coming Soon</h3>
        </div>
      </StickyHeader>
    </div>

    <div class="relative z-10 gutters pt-space-2x" :style="{ fill: data.primary }">
      <div class="-m-05 flex flex-row flex-wrap">
        <EventDate :date="data.date" class="m-05 flex-auto" />
        <EventWeather :uid="uid" class="m-05 flex-auto" />
        <EventLocation
          class="m-05 flex-initial w-full"
          :address="data.address"
          :map="data.map"
          :city="data.city"
          :state="data.state"
          :venue="data.venue"
        />
      </div>
    </div>

    <div
      class="relative z-10 gutters pt-space-2x"
      :class="{ 'flex flex-row pb-space': slices, 'pb-space-2x': !slices }"
      ref="slices"
    >
      <template v-if="slices">

        <div class="flex-auto">
          <template v-for="(slice, i) in slices">
            <component
              class="pb-space"
              :is="components[slice.slice_type]"
              :slice="slice"
              :id="slice.id"
            />
          </template>
        </div>

        <div class="flex-initial hidden xl:block pl-20">
          <aside ref="sidebar" class="flex flex-col">
            <template v-for="(slice, i) in slices">
              <button
                v-if="slice.primary.title"
                v-html="slice.primary.title"
                @click="() => scrollTo(slice.id)"
                class="button bg-pink text-white"
                :class="{ 'mb-05': i < slices.length - 1 }"
              />
            </template>
          </aside>
        </div>

      </template>

      <div v-else class="text-center">
        <h1 class="inline-block font-bold text-16 leading-12 graphic-box rounded-lg text-white p-20" :style="{ background: data.primary }">
          More Information Coming Soon!
        </h1>
      </div>
    </div>
  </main>
</template>

<script>
import { random } from "@/assets/helpers";
import config from "@/tailwind.config.js";
import { components } from "@/slices";
import mixins from '@/mixins/mixins'

export default {
  mixins:[mixins],
  name: "EventPage",
  async asyncData({ error, store, params, $prismic, payload }) {
    let res = null;
    let uid = params.id;
    let data = store.state.events[uid];

    if (payload) {
      store.commit("EVENT", [uid, payload.data]);
      data = payload.data;
    }

    if (!data) {
      res = await $prismic.api.getByUID("event", uid);
      if (res) {
        store.commit("EVENT", [uid, res.data]);
        data = res.data;
      }
    }

    if (data) return { data, uid };
    error({ statusCode: 404 });
  },
  data: () => ({
    data: null,
    uid: null,
    components,
  }),
  mounted() {
    setTimeout(() => {
      gsap.set("#event .bg-pink", { background: this.data.primary });
      gsap.set("#event .bg-green", { background: this.data.secondary });

      if (this.slices) {
        let sticky = this.$refs.stickyHeader;
        let sidebar = this.$refs.sidebar;

        this.sidebarAnim = ScrollTrigger.create({
          trigger: this.$refs.slices,
          start: () => `top top`,
          end: () => `bottom top+=${sidebar.offsetHeight + sticky.offsetHeight + this.getSpace() * 3}`,
          pin: this.$refs.sidebar,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      }
    }, 500);
  },
  destroyed() {
    this.sidebarAnim && this.sidebarAnim.kill();
  },
  computed: {
    slices() {
      if (!this.data.slices || this.data.slices.length == 0) return null;

      let slices = [];
      this.data.slices.forEach((s, i) => {
        if (s.primary.publish || s.primary.publish == null) {
          slices.push({ ...s, id: `${s.slice_type}-${i + 1}` });
        }
      });
      return slices;
    },
  },
  methods: {
    getSpace() {
      let space = parseInt(config.theme.spacing.space);
      let size = window.innerWidth >= parseInt(config.theme.screens.md) ? "desktop" : "mobile";
      let rem = parseInt(config.theme.fontSize[size]);
      return space * rem;
    },
    scrollTo(id) {
      let el = document.getElementById(id);
      let offset = this.getSpace() * 2 - 2;
      gsap.to(window, 1, {ease: "power2.out",scrollTo: { y: el, offsetY: offset }});
    },
  },
};
</script>

<style lang="css">
#event .page-content > div {
  margin-top: theme("spacing.space");
}
#event .page-content > div:first-child {
  margin-top: 0px;
}
</style>
