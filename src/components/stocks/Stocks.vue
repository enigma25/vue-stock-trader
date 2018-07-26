<template>

  <div 
    v-if="stocks.length" 
    class="row"
  >
    <app-stock-to-buy  
      v-for="stock in stocks" :key="stock.id"
      :stock="stock"
      @buy-stock="buyStock"
    />
  </div>

  <div 
    v-else 
    class="alert alert-info container-fluid" role="alert"
  >
    No stock available to buy 
    <router-link :to="{ name: 'portfolio' }">
      <a class="alert-link">
        Go here to sell stocks
      </a>
    </router-link>
  </div>
  
</template>

<script>
import StocksToBuy from "./StocksToBuy.vue";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  methods: {
    buyStock({ stockID, price, quantity }) {
      if (this.insufficientFunds(price, quantity)) {
        alert("Sorry but you don't have enough money!!");
      } else {
        this.buyStockAction({ stockID, quantity });
      }
    },
    insufficientFunds(price, quantity) {
      return quantity * price > this.funds ? true : false;
    },
    ...mapActions({ buyStockAction: "portfolio/buyStock" })
  },
  computed: {
    ...mapState({
      stocks: state => state.stocks.items,
      funds: state => state.portfolio.funds
    })
  },
  components: {
    appStockToBuy: StocksToBuy
  }
};
</script>

<style scoped>
div.row {
  padding: 10px;
}
</style>
