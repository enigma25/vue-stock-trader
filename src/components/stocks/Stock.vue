<template>
    <div class="col-sm-6 col-md-4 cardContainer">
        <div class="card border-info">
            <div class="card-header">
                <slot name="header"></slot>
            </div>
            <div class="card-body">
                <div class="float-left">
                    <input 
                      type="number" 
                      v-model.number="quantity" 
                      @input="onInput"
                      class="form-control"
                      min="0"
                    > 
                </div>
                <div class="float-right">
                    <button 
                      @click="onSubmit" 
                      :disabled="isDisabled"
                      class="btn form-control"
                      :class="[invalidTransaction? 'btn-danger': 'btn-info']" 
                    >
                      <slot name="label"></slot>
                    </button>
                </div>
            </div>
            <div 
              class="card-footer" 
              :class="[invalidTransaction? 'text-danger': 'text-muted']"
            >
              Transaction amount : {{ totalTransaction | currency }}
            </div>
        </div>     
    </div>    
</template>

<script>
export default {
  props: {
    invalidTransaction: Boolean,
    totalTransaction: Number
  },
  data() {
    return {
      quantity: 0
    };
  },
  methods: {
    onInput() {
      this.$emit("quantity-change", this.quantity);
    },
    onSubmit() {
      if (this.quantity >= 0) {
        this.$emit("quantity-selected", this.quantity);
        this.quantity = 0;
      } else {
        alert("please select a valid quantity");
      }
    }
  },
  computed: {
    isDisabled() {
      return (
        this.quantity <= 0 ||
        !Number.isInteger(this.quantity) ||
        this.invalidTransaction
      );
    }
  }
};
</script>

<style scoped>
div.cardContainer {
  margin-bottom: 10px;
}
</style>
