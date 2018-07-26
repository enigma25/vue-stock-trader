<template>
    <div class="container-fluid">
        <router-view name="header-view"></router-view>
        <div class="col-xs-12">
          <transition name="slide" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({ initStocks: "stocks/fetchStocks" })
  },
  created() {
    this.initStocks();
  }
};
</script>

<style>
body {
  padding: 0, 10px;
}
.slide-enter-active,
.slide-leave-active {
  transition: 0.5s ease-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(30px);
}
</style>
