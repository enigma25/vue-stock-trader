<template>
    <app-stock 
      @quantity-selected="sellStock"
      @quantity-change="quantityChange" 
      :total-transaction="totalTransaction" 
      :invalid-transaction="insufficientQuantity"
    >
      <template slot="header">
        <h5>{{ stock.title }}
          <small class="text-info">
            (Price : {{ stock.price | currency }} | Quantity : {{ stock.quantity }})
          </small>
        </h5>
      </template>
      <label slot="label">{{ insufficientQuantity? 'Not enough stocks' : 'SELL' }}</label>
    </app-stock>  
</template>

<script>
import Stock from "../stocks/Stock.vue";
export default {
  data() {
    return {
      insufficientQuantity: false,
      totalTransaction: 0
    };
  },
  props: ["stock"],
  components: {
    appStock: Stock
  },
  methods: {
    quantityChange(quantity) {
      this.totalTransaction = quantity * this.stock.price;
      this.insufficientQuantity = quantity > this.stock.quantity ? true : false;
    },
    sellStock(quantity) {
      const order = {
        stockID: this.stock.id,
        quantity: quantity
      };
      this.$emit("sell-stock", order);
      this.resetTotal();
    },
    resetTotal() {
      this.insufficientQuantity = false;
      this.totalTransaction = 0;
    }
  }
};
</script>

<style scoped>
</style>
