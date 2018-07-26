import { stocksData } from "../../api/market";

function getRandomValue() {
  return parseInt((Math.random() / 2.5 + 0.8) * 10) / 10;
}
export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
    // getter for getStockByID
    getStockByID: state => id => {
      return state.items.find(item => item.id === id);
    }
  },
  mutations: {
    setStocks(state, stocks) {
      state.items = stocks;
    },
    randomStocks(state) {
      state.items = state.items.map(item => ({
        ...item,
        price: item.price * getRandomValue()
      }));
    }
  },
  actions: {
    fetchStocks({ commit }) {
      commit("setStocks", stocksData);
    },
    randomizeStocks({ commit }) {
      commit("randomStocks");
    }
  }
};
