<template>
  <div class="product-option iterative" v-if="init">
    <div class="minus" @click="sub()">-</div>
    <input type="number" v-model="option_object.value" disabled>
    <div class="plus" @click="add()">+</div>
  </div>
</template>

<script>
import IterativeOption from '~/classes/product/IterativeOption'

export default {

  name: 'IterativeProductOption',

  props: {
    option: {
      type: IterativeOption,
      required: true
    },
    sync:   {
      type: Boolean,
      required: true
    },
  },

  data() {
    return {
      option_object: null,
      init: false,
    }
  },

  methods: {
    cloneOrigin() {
      this.option_object = _.cloneDeep(this.option);
    },
    updateOption() {
      this.$emit('update', this.option_object);
    },
    sub() {
      this.option_object.decrement();
    },
    add() {
      this.option_object.increment();
    },
  },

  watch: {
    option() {
      this.cloneOrigin();
    },
    sync() {
      if (this.sync) {
        this.updateOption()
      }
    }
  },

  mounted() {
    this.cloneOrigin();
    this.init = true;
  },
}
</script>
