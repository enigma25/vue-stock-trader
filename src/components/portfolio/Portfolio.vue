<template>
  <transition-group  
    v-if="stocks.length"
    name="fade" 
    tag="div" 
    class="row" 
  >
    <app-stock-for-sell 
      v-for="stock in stocks" :key="stock.id" 
      :stock="stock"
      @sell-stock="sellStock"
    />
  </transition-group>
   
  <div 
    v-else 
    class="alert alert-info container-fluid" 
    role="alert"
  >
    No stock available for sell 
    <router-link :to="{ name: 'stocks' }">
      <a class="alert-link">
        Go here to buy stocks
      </a>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import StocksForSell from "./StocksForSell.vue";
export default {
  methods: {
    ...mapActions({ sellStock: "portfolio/sellStock" })
  },
  computed: {
    ...mapGetters("portfolio", { stocks: "getPortfolioStocks" }),
    ...mapState({ funds: state => state.portfolio.funds })
  },
  components: {
    appStockForSell: StocksForSell
  }
};
</script>

<style scoped>
div.row {
  padding: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
