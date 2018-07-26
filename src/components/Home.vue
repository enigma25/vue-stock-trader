<template>
    <div>
        <h1>Welcome super trader</h1>
        <p class="font-italic text-info">
            Your funds : {{ funds | currency}}
        </p>
        <div  class="logo-container">
          <img src="../assets/logo.svg" alt="logo" id="logo"/>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({ funds: state => state.portfolio.funds })
  }
};
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
#logo {
  display: block;
  height: 50%;
  width: 40%;
}
</style>
