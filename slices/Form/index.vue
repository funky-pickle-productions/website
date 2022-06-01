<template lang="html">
  <section class="form-section">
    <div class="rounded-lg overflow-hidden graphic-box">

      <div v-if="title" class="pl-20 md:pl-50 p-10 bg-lime border-b border-black">
        <h3 v-html="title" class="font-header uppercase text-25"/>
      </div>

      <div class="bg-white p-20 md:px-50 md:py-40">

        <ElementText v-if="description" :field="description" class="mb-30"/>

        <ElementForm :fields="slice.items" multiColumn @submit="handleSubmit">
          <div class="mt-40">
            <button class="button" type="submit" name="submit" v-html="label"/>
          </div>
        </ElementForm>

      </div>

    </div>
  </section>
</template>

<script>
export default {
  name:"FormSlice",
  props:['slice'],
  data:()=>({
    label: 'Submit',
    sent: false
  }),
  computed:{
    inline(){
      return this.slice.primary.inline
    },
    title(){
      return this.slice.primary.title || null
    },
    description(){
      return this.slice.primary.description.length > 0
           ? this.slice.primary.description : null
    },
    action(){
      return this.slice.primary.action
    }
  },
  methods:{
    async handleSubmit(data){
      if (this.sent) return

      if (this.slice.primary.sheet) data.sheetName = this.slice.primary.sheet

      let formData = new FormData()
      Object.keys(data).forEach(key => formData.append(key,data[key]))
      this.label = "Sending..."
      await fetch(this.action, {method: 'POST',body:formData})
      this.label = "Sent!"
      this.sent = true
    }
  }
}
</script>

<style media="screen">
.text-section + .form-section.pt-space-2x,
.form-section + .form-section.pt-space-2x{
  padding-top: theme('spacing.space')
}
</style>
