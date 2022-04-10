<template lang="html">
  <FormulateForm
    class="form-element"
    :class="{ 'multi-column': multiColumn }"
    @submit="(data) => $emit('submit', data)"
  >
    <div class="formulate-fields -m-07">
      <template v-for="field in fields">
        <ElementInput :data="field" :flexWidth="multiColumn" />
      </template>
    </div>

    <slot />
  </FormulateForm>
</template>

<script>
export default {
  props: {
    multiColumn: Boolean,
    fields: { type: Array, default: () => [] },
  },
};
</script>

<style lang="css">
.formulate-form.multi-column .formulate-fields {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.formulate-form.multi-column .formulate-input[data-type="textarea"] {
  flex: 1 1 100%;
}

.formulate-form.multi-column .formulate-input[data-type="text"],
.formulate-form.multi-column .formulate-input[data-type="email"] {
  flex: 1 1 300px;
}

.formulate-form.multi-column .formulate-input[data-type="tel"] {
  flex: 1 1 200px;
}

.formulate-form.multi-column .formulate-input[data-type="select"] {
  flex: 1 1 auto;
}
</style>
