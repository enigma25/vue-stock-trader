import Vue from "vue";

export const loadData = ({ commit }) => {
  Vue.http
    .get("data.json")
    .then(response => response.body)
    .then(data => {
      const { stocks, portfolioStocks, funds } = data;
      if (stocks) {
        commit("stocks/setStocks", stocks);
      }
      if (funds) {
        commit("portfolio/setFunds", funds);
      }
      if (portfolioStocks) {
        commit("portfolio/setPortfolioStocks", portfolioStocks);
      }
    });
};
