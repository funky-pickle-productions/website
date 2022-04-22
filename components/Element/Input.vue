<template lang="html">
  <FormulateInput
    v-if="data"
    class="m-07 text-left"
    :class="{ 'field-required': data.required, 'flex-width': flexWidth }"
    :type="type"
    :name="data.key"
    :label="data.label"
    :validation="validation"
    :options="options"
    :placeholder="data.placeholder"
    :validation-rules="validationRules"
  />
</template>

<script>
export default {
  props: {
    data: { type: Object, default: null },
    flexWidth: Boolean,
  },
  computed: {
    type() {
      return this.data.type || "text";
    },
    options() {
      if (!this.data.options) return null;
      switch (this.type) {
        case "radio":
          let o = {};
          this.data.options.split(",").forEach((v) => (o[v] = v));
          return o;
        case "select":
          return this.data.options.split(",").map((v) => v.trim());
      }
    },
    validation() {
      let val = "";
      if (this.data.required) val = "required";
      switch (this.type) {
        case "email":
          val != "" && (val += "|");
          val += "emailValidator";
          break;

        case "tel":
          val != "" && (val += "|");
          val += "phoneValidator";
          break;
      }
      return val;
    },
    validationRules() {
      return {
        emailValidator: ({ value }) => {
          if (!value && !this.data.required) return true;
          let regex = new RegExp(
            "([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])"
          );
          return regex.test(value);
        },
        phoneValidator: ({ value }) => {
          if (!value && !this.data.required) return true;
          let regex = new RegExp(
            "^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})"
          );
          return regex.test(value);
        },
      };
    },
  },
};
</script>

<style lang="css">
.formulate-input input,
.formulate-input textarea,
.formulate-input select {
  display: block;
  padding: 0.75rem 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 3px 3px 0px theme("colors.black");
  border: 1px solid theme("colors.black");
  width: 100%;
  margin: 0px;
  background: white;
  font-size: 16px;
  appearance: none;
}
.formulate-input label {
  margin-bottom: 0.5rem;
  display: inline-block;
}

[data-is-showing-errors="true"] input,
[data-is-showing-errors="true"] select,
[data-is-showing-errors="true"] textarea {
  border: 1px solid theme("colors.pink");
  box-shadow: 3px 3px 0px theme("colors.pink");
}
[data-is-showing-errors="true"] label {
  color: theme("colors.pink");
}
.formulate-input-errors {
  display: none;
}

.formulate-input-element--select {
  position: relative;
}
.formulate-input-element--select::before {
  content: "";
  width: 0;
  height: 0;
  border-color: #cecece transparent transparent;
  border-style: solid;
  border-width: 0.3em 0.3em 0;
  top: 50%;
  margin-top: -0.1em;
  right: 1em;
  position: absolute;
}
</style>
