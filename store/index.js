import weather from "@/assets/weather.json";
import { getDateOffset } from "@/assets/helpers";

export default{
  state:()=>({
    products:{},
    checkouts:{},
    events:{},
    pages:{},
    weather:{},
    settings:{
      links:[],
      signup:{},
      footer:{}
    },
    lists:{
      events:[],
    }
  }),
  mutations:{
    PRODUCTS:(state,[key,data])=> state.products[key] = data,
    CHECKOUT:(state,[key,data])=> state.checkouts[key] = data,
    EVENT:(state,[key,data]) => state.events[key] = data,
    PAGE:(state,[key,data]) => state.pages[key] = data,
    WEATHER:(state,data) => state.weather = data,
    SETTINGS:(state,data) => state.settings = data,
    LIST:(state,[key,data]) => state.lists[key] = data
  },
  actions:{
    async EVENTS_LIST({commit}){

      let date = getDateOffset(-1);
      let res = await this.$prismic.api.query([
        this.$prismic.predicates.at("document.type", "event"),
        this.$prismic.predicates.date.after("my.event.date", date)
      ], {
        graphQuery: `{
        event
        {
        title
        state
        city
        banner
        background
        ball
        uid
        date
        }
        }`,
        orderings: "[my.event.date]",
      });

      commit("LIST", ["events", res.results]);

    },
    async SETTINGS({commit}){
      let res = await this.$prismic.api.getSingle("settings");
      if (!res) return

      let links = res.data.slices1
      let signup = { title: res.data['signup-title'],form:res.data.slices2}
      let footer = {text: res.data.footer,social: res.data.social}


      commit('SETTINGS',{links,signup,footer})
    },
    async nuxtServerInit({dispatch,commit}){
      await dispatch('SETTINGS')
      await dispatch('EVENTS_LIST')
      commit('WEATHER',weather)
    }
  }
}
