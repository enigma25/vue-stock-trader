<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">
          <router-link 
            to="/" 
            tag="li" 
            class="nav-item nav-link" 
            exact
          >
            Stock Trader
          </router-link>
          <router-link 
            to="/stocks" 
            tag="li" 
            class="nav-item nav-link"
          >
            Stocks
          </router-link>
          <router-link 
            to="/portfolio" 
            tag="li" 
            class="nav-item nav-link"
            >
              Portfolio
            </router-link>
        </ul>
        
        <ul class="navbar-nav ml-auto">
          <li class="nav-item dropdown">
            <a 
              class="nav-link dropdown-toggle" 
              href="#" id="navbarDropdown" role="button" 
              data-toggle="dropdown" 
              aria-haspopup="true"
              aria-expanded="false"
            >
              Actions
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a 
                @click="saveData"
                class="dropdown-item" 
                href="#"
              >
                Save Data
              </a>
              <a 
                @click="loadData"
                class="dropdown-item" 
                href="#"
              >
                Load Data
              </a>
              <div class="dropdown-divider"></div>
              <a 
                @click="updateStocks"
                class="dropdown-item" 
                href="#"
              >
                End Day
              </a>
            </div>
          </li>
        </ul>
        <span 
          class="badge badge-pill" 
          :class="[funds > FUNDS_MIN? 'badge-info':'badge-danger']"
        >
          Funds : {{ funds | currency }}
        </span>
      </div>
    </nav>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
const FUNDS_MIN = 1000;
export default {
  data() {
    return { FUNDS_MIN };
  },
  computed: {
    ...mapState({
      funds: state => state.portfolio.funds,
      stocks: state => state.stocks.items
    }),
    ...mapGetters("portfolio", { portfolioStocks: "getPortfolioStocks" })
  },
  methods: {
    ...mapActions({
      updateStocks: "stocks/randomizeStocks",
      loadData: "loadData"
    }),
    saveData() {
      const data = {
        funds: this.funds,
        stocks: this.stocks,
        portfolioStocks: this.portfolioStocks
      };
      this.$http.put("data.json", data);
    }
  }
};
</script>

<style>
.badge {
  font-size: 100%;
  line-height: normal;
}
.nav-link {
  cursor: pointer;
}
</style>
