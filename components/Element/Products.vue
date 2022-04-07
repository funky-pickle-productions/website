<template lang="html">
  <div class="">
    <template v-for="(item,i) in items">
      <div class="flex flex-row product-box my-05" :class="{'bg-lime':item.quantity > 0}">

        <div class="flex-shrink-0 flex-grow-0 flex items-center justify-center bg-black text-white w-30">
          <span v-html="item.quantity" class="font-header text-25"/>
        </div>
        <div class="p-10">
          <h3 class="font-bold text-13 m-0" v-html="item.label"/>
          <p v-if="item.description" class="m-0 text-09 md:text-10" v-html="item.description"/>
          <p v-html="formatCurrency(item.price)" class="mt-10 opacity-70 font-semibold"/>
        </div>


        <div class="ml-auto flex-shrink-0 flex-grow-0 flex flex-col">

          <template v-if="item.max > 1">
            <button class="product-button px-10 flex-auto" :class="{'disabled':item.quanity == item.max}" @click="add(i)">
              <div class="wrapper" v-html="'+'"/>
            </button>
            <button class="product-button last px-10 flex-auto" :class="{'disabled':item.quanity == item.min}" @click="remove(i)">
              <div class="wrapper" v-html="'-'"/>
            </button>
          </template>

          <template v-else>
            <button class="product-button flex-auto" @click="item.quantity == 1 ? remove(i) : add(i)">
              <div class="wrapper">
                <Icon v-if="item.quantity == 1" check class="h-10"/>
                <span v-else>+</span>
              </div>
            </button>
          </template>

        </div>


      </div>
    </template>

    <div class="mt-10 text-13 text-right">
      <span v-html="'Total:'"/>
      <span class="font-bold" v-html="total"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    products:{type:Array,default:()=>[]}
  },
  mounted(){
    this.initialize()
  },
  data:()=>({
    items:[],
  }),
  computed:{
    total(){
      let total = this.items.reduce((a,i)=> a += i.quantity * i.price,0)
      return this.formatCurrency(total)
    }
  },
  methods:{
    add(index){
      if (this.items[index].quantity < this.items[index].max){
        this.items[index].quantity += 1
        if(this.items[index].option){
          for(let i = 0; i < this.items.length; i++){
            if(i != index && this.items[i].option) this.items[i].quantity = 0
          }
        }
      }
    },
    remove(index){
      if(this.items[index].option && this.items[index].quantity == 1) return
      if (this.items[index].quantity > this.items[index].min){
        this.items[index].quantity -= 1
      }
    },
    async initialize(){

      let first = true

      for(let i = 0; i < this.products.length; i++){

        let res = await fetch(`${this.$config.baseUrl}/.netlify/functions/get-products`,{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pid: this.products[i].pid }),
        })

        let data = await res.json()

        if (data){

          let item = {
            ...this.products[i],
            price_id: data.id,
            label: data.product.name,
            description: data.product.description,
            active: data.product.active,
            price: data.unit_amount / 100,
            quantity: this.products[i].min
          }

          item.option && first && (item.quantity += 1,first = false)
          this.items.push(item)

        }

      }

    },
    submit(){
      let products = []
      this.items.forEach(item => item.quantity > 0 && products.push({
        id:item.price_id,
        quantity: item.quantity
      }))
      this.$emit('submit',{products, total: this.total})
    },
    formatCurrency(amt){
      return (amt).toLocaleString('en-US', {style: 'currency',currency: 'USD'})
    }
  }
}
</script>

<style lang="css">
.product-box{
  overflow: hidden;
  box-shadow: 2px 2px 0px theme('colors.black');
  border: 1px solid theme('colors.black');
  border-radius: .5rem;
}

.product-button{
  border-left: 1px solid theme('colors.black');
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  font-size: 2rem;
}
.product-button .wrapper{
  transform: scale(1.001);
  transition: transform .2s;
}

.product-button.last{
  border-top: 1px solid theme('colors.black');
}

.product-button:active .wrapper{
  transform: scale(.8)
}


</style>
