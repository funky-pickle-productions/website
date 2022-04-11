<template lang="html">
  <section class="signup-section gutters py-space bg-lime relative overflow-hidden z-30">

    <div class="relative z-20 flex flex-col xl:flex-row items-center text-center xl:text-left">
      <div class="flex-auto mb-20 xl:mb-0 xl:mr-30">
        <prismic-rich-text :field="data.title" class="font-header font-bold uppercase leading-09 text-40 sm:text-50"/>
      </div>
      <div class="flex-auto w-400px max-w-4/5" v-if="data.form">
        <ElementForm :fields="data.form[0].items" buttonLabel="Signup" @submit="handleSubmit">
          <div class="mt-40">
            <button class="button" type="submit" name="submit" v-html="label"/>
          </div>
        </ElementForm>
      </div>
    </div>

    <div class="absolute -inset-10 z-10">
      <div class="h-full bg-cover bg-center" :style="{backgroundImage:`url(/fp_giraffe.svg)`}" />
    </div>

  </section>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data:()=>({
    label: 'Signup',
    sent: false
  }),
  computed: mapState({
    data: state => state.settings.signup
  }),
  methods:{
    async handleSubmit(data){
      if (this.sent) return

      let action = this.data.form[0].primary.action
      let formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key,data[key]))
      this.label = "Sending..."
      await fetch(action, {method: 'POST',body:formData})
      this.label = "Sent!"
      this.sent = true
    }
  }
}
</script>
