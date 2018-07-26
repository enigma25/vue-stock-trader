<template>
  <app-stock 
    @quantity-selected="buyStock" 
    @quantity-change="quantityChange" 
    :total-transaction="totalTransaction" 
    :invalid-transaction="insufficientFunds"
  >
    <template slot="header">
      <h5>{{ stock.title }} 
        <small class="text-info">
          (Price : {{ stock.price  | currency }}) 
        </small>
      </h5> 
    </template>
    <label slot="label"> {{ insufficientFunds? 'Insuffucient founds' : 'Buy' }}</label>
  </app-stock>    
</template>

<script>
import Stock from "./Stock.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      insufficientFunds: false,
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
      this.insufficientFunds =
        this.totalTransaction > this.funds ? true : false;
    },
    buyStock(quantity) {
      const order = {
        stockID: this.stock.id,
        price: this.stock.price,
        quantity: quantity
      };
      this.$emit("buy-stock", order);
      this.resetTotal();
    },
    resetTotal() {
      this.insufficientFunds = false;
      this.totalTransaction = 0;
    }
  },
  computed: {
    ...mapState({ funds: state => state.portfolio.funds })
  }
};
</script>

<style>
</style>
