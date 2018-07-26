import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";

import { router } from "./routes";
import { store } from "./store/index";

import { currency } from "./currency";

Vue.filter("currency", currency);

Vue.use(VueResource);
Vue.http.options.root = "https://nam-vue-stock-trader.firebaseio.com/";

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
