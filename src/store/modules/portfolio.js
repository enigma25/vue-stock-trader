const SELL_STOCK = "SELL";
const BUY_STOCK = "BUY";

export default {
  namespaced: true,
  state: {
    funds: 4000,
    items: []
  },
  getters: {
    getPortfolioStocks(state, getters, rootState, rootGetters) {
      return state.items.map(portfolioItem => {
        const stock = rootGetters["stocks/getStockByID"](portfolioItem.id);
        return {
          id: portfolioItem.id,
          title: stock.title,
          price: stock.price,
          quantity: portfolioItem.quantity
        };
      });
    }
  },
  mutations: {
    setPortfolioStocks(state, portfolioStocks) {
      state.items = portfolioStocks;
    },
    setFunds(state, funds) {
      state.funds = funds;
    },
    incrementStockQuantity(state, { portfolioItem, quantity }) {
      portfolioItem.quantity += quantity;
    },
    addStockToPortfolio(state, { stockID, stockPrice, quantity }) {
      state.items = [
        ...state.items,
        {
          id: stockID,
          price: stockPrice,
          quantity: quantity
        }
      ];
    },
    decrementStockQuantity(state, { portfolioItem, quantity }) {
      portfolioItem.quantity -= quantity;
    },
    removeStockFromPortfolio(state, portfolioItem) {
      state.items = state.items.filter(item => item !== portfolioItem);
    },
    updateFunds(state, { stockPrice, quantity, transactionType }) {
      const amount = stockPrice * quantity;
      state.funds =
        transactionType === SELL_STOCK
          ? state.funds + amount
          : state.funds - amount;
    }
  },
  actions: {
    buyStock({ state, commit, rootGetters }, { stockID, quantity }) {
      const portfolioItem = state.items.find(
        portfolioItem => portfolioItem.id === stockID
      );
      let stockPrice = 0;
      if (portfolioItem) {
        stockPrice = portfolioItem.price;
        commit("incrementStockQuantity", { portfolioItem, quantity });
      } else {
        stockPrice = rootGetters["stocks/getStockByID"](stockID).price;
        commit("addStockToPortfolio", { stockID, stockPrice, quantity });
      }
      commit("updateFunds", {
        stockPrice,
        quantity,
        transactionType: BUY_STOCK
      });
    },
    sellStock({ state, commit }, { stockID, quantity }) {
      const portfolioItem = state.items.find(
        portfolioItem => portfolioItem.id === stockID
      );
      const stockPrice = portfolioItem.price;
      if (portfolioItem.quantity > quantity) {
        commit("decrementStockQuantity", { portfolioItem, quantity });
      } else {
        commit("removeStockFromPortfolio", portfolioItem);
      }
      commit("updateFunds", {
        stockPrice,
        quantity,
        transactionType: SELL_STOCK
      });
    }
  }
};
