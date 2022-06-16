<template>
  <section v-if="sponsors.length > 0" class="sponsors-section">

    <Title v-if="title" :value="title" class="mb-40"/>

    <div class="flex flex-wrap -m-05">

      <template v-for="(sponsor,i) in sponsors">

        <a :href="sponsor.link.url" target="_blank" class="flex-auto graphic-box rounded-lg bg-white flex items-center justify-center m-05 p-10">
          <img class="image max-h-100px max-w-150px" :src="sponsor.logo.url"/>
        </a>

      </template>

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
