<template lang="html">
  <div class="products">
    <template v-for="(product, i) in data">
      <div
        class="flex flex-row product-box my-05"
        :class="{ 'bg-lime': product.amount > 0, 'cursor-pointer':product.max == 1 }"
        @click="product.max == 1 && (product.amount == 1 ? remove(i) : add(i))"
      >
        <div
          class="flex-shrink-0 flex-grow-0 flex items-center justify-center bg-black text-white w-30"
        >
          <span v-html="product.amount" class="font-header text-25" />
        </div>

        <div class="p-10">
          <h3 class="font-bold text-13 mb-10" v-html="product.name" />
          <div v-if="product.description.length > 0" class="product-description text-08">
            <prismic-rich-text :field="product.description"/>
          </div>

          <p v-html="formatCurrency(product.price)" class="opacity-70 font-semibold"/>
        </div>

        <div class="ml-auto flex-shrink-0 flex-grow-0 flex flex-col">
          <template v-if="product.max > 1">
            <button
              class="product-button px-10 flex-auto"
              :class="{ disabled: product.amount == product.max }"
              @click="add(i)"
            >
              <div class="wrapper" v-html="'+'" />
            </button>
            <button
              class="product-button last px-10 flex-auto"
              :class="{ disabled: product.amount == product.min }"
              @click="remove(i)"
            >
              <div class="wrapper" v-html="'-'" />
            </button>
          </template>

          <template v-else>
            <button class="product-button flex-auto">
              <div class="wrapper">
                <Icon v-if="product.amount == 1" check class="h-10" />
                <span v-else>+</span>
              </div>
            </button>
          </template>
        </div>
      </div>
    </template>

    <div class="mt-20 text-13 text-right">
      <h3 v-html="`Total: ${total}`" />
    </div>

    <slot />
  </div>
</template>

<script>
export default {
  props: {
    products: { type: Array, default: () => [] },
  },
  data: () => ({
    data: [],
  }),
  watch: {
    products() {
      this.addData();
    },
  },
  mounted() {
    this.addData();

    let el = this.$slots.default[0].elm;
    this.btn = el.querySelector("button");
    this.btn && this.btn.addEventListener("click", this.handleSubmit);
  },
  destroyed() {
    this.btn && this.btn.removeEventListener("click", this.handleSubmit);
  },
  computed: {
    total() {
      let total = this.data.reduce((a, i) => (a += i.amount * i.price), 0);
      return this.formatCurrency(total);
    },
  },
  methods: {
    addData() {
      let optionChosen = false;
      this.data = this.products.map((i) => {
        if (i.option && !optionChosen) {
          optionChosen = true;
          return { ...i, amount: 1 };
        }
        return { ...i, amount: 0 };
      });
    },

    formatCurrency(amt) {
      return amt.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    },

    add(i) {
      if (this.data[i].amount < this.data[i].max) {
        this.data[i].amount += 1;
        if (this.data[i].option) {
          for (let p = 0; p < this.data.length; p++) {
            if (p != i && this.data[p].option) this.data[p].amount = 0;
          }
        }
      }
    },

    remove(i) {
      if (this.data[i].option && this.data[i].amount == 1) return;
      if (this.data[i].amount > this.data[i].min) {
        this.data[i].amount -= 1;
      }
    },

    handleSubmit() {
      let products = [];
      this.data.forEach((product) => product.amount > 0 && products.push(product));
      this.$emit("submit", { products, total: this.total });
    },
  },
};
</script>

<style lang="css">
.product-box {
  overflow: hidden;
  box-shadow: 2px 2px 0px theme("colors.black");
  border: 1px solid theme("colors.black");
  border-radius: 0.5rem;
}

.product-button {
  border-left: 1px solid theme("colors.black");
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  font-size: 2rem;
}
.product-button .wrapper {
  transform: scale(1.001);
  transition: transform 0.2s;
}

.product-button.last {
  border-top: 1px solid theme("colors.black");
}

.product-button:active .wrapper {
  transform: scale(0.8);
}

.product-description  p{
  margin-bottom: 1rem;
}
</style>
