const Prismic = require("@prismicio/client");

export default {
  loading: false,
  components: true,
  target: "static",
  head: {
    title: "funkypickle",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&family=Saira+Extra+Condensed:wght@600;700&display=swap" },
      {rel:"stylesheet", href:"https://unpkg.com/swiper@8/swiper-bundle.min.css"}
    ],
    script: [
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/gsap.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.0/ScrollTrigger.min.js" },
      { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/ScrollToPlugin.min.js" },
      {src:"https://unpkg.com/swiper@8/swiper-bundle.min.js"}
    ],
  },
  css: ['@/assets/main.css'],
  plugins: [
    { src: "@/plugins/eventBus.js", ssr: true },
    { src: "@/plugins/screenBuddy.js", ssr: false },
    { src: "@/plugins/directives.js", ssr: false },
  ],
  buildModules: ["@nuxtjs/tailwindcss", "@nuxtjs/prismic","@braid/vue-formulate/nuxt"],
  prismic: {
    endpoint: process.env.PRISMIC_END_POINT,
    modern: true,
    preview: false,
    apiOptions: {
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    },
  },
  generate: {
    fallback: "404.html",
    interval: 500,
    async routes() {
      let routes = [];
      let client = Prismic.client(process.env.PRISMIC_END_POINT, { accessToken: process.env.PRISMIC_ACCESS_TOKEN });

      let pages = await client.query(Prismic.Predicates.at("document.type", "page"));
      pages.results.forEach((data) => routes.push({ route: `/${data.uid}`, payload: data }));

      let events = await client.query(Prismic.Predicates.at("document.type", "event"));
      events.results.forEach((data) => routes.push({ route: `/event/${data.uid}`, payload: data }));

      return routes;
    },
  },
  modules: [],
  build: {},
};
