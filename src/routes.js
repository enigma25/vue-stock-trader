import VueRouter from "vue-router";
import Vue from "vue";

import Home from "./components/Home.vue";
import Header from "./components/Header.vue";

//lazily loading imports
const Stocks = () => import("./components/stocks/Stocks.vue");
const Stock = () => import("./components/stocks/Stock.vue");
const Portfolio = () => import("./components/portfolio/Portfolio.vue");

const routes = [
  //home
  {
    path: "",
    name: "home",
    components: {
      default: Home,
      "header-view": Header
    }
  },
  //stocks
  {
    path: "/stocks",
    name: "stocks",
    components: {
      default: Stocks,
      "header-view": Header
    }
    // children: [
    //   {
    //     path: "",
    //     component: Stocks
    //   },
    //   {
    //     path: ":id",
    //     component: Stock,
    //     props: true
    //   }
    // ]
  },
  //portfolio
  {
    path: "/portfolio",
    name: "portfolio",
    components: {
      default: Portfolio,
      "header-view": Header
    }
    // children: [
    //   {
    //     path: ":id",
    //     component: PortfolioStock,
    //     props: true
    //   }
    // ]
  },
  {
    path: "*",
    redirect: { name: "home" }
  }
];

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
  mode: "history",
  linkActiveClass: "active"
});
