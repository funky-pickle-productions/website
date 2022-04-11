<template>
  <section v-if="sponsors.length > 0" class="sponsors-section">

    <Title v-if="title" :value="title" class="mb-40"/>

    <div class="graphic-box rounded-lg bg-white">
      <div class="px-20 pt-20" v-if="description">
        <ElementText :field="description"/>
      </div>
      <div class="flex flex-row flex-wrap items-stretch justify-center p-20">
        <template v-for="(sponsor,i) in sponsors">
            <div :key="i" class="sponsor p-10 w-1/2 lg:w-1/3">
              <img class="image" :src="sponsor.logo.url"/>
            </div>
        </template>
      </div>
    </div>

  </section>
</template>

<script>

export default {
  name: "SponsorsSlice",
  props: ['slice'],
  computed:{
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    sponsors(){
      return this.slice.items
    }
  }
}
</script>

<style lang="css">


.sponsor-wrapper{
  flex: 0 0 50%;
  align-self: stretch;
}

@media screen and (min-width:theme('screens.lg')){
  .sponsor-wrapper{
    flex: 0 0 33.333%;
  }
}
</style>
