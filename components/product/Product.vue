<template>
  <div class="product">
    <div v-if="init">
      {{ product_object.title }}
      <fish-button type="primary" :loading="!init" @click="showModal()">в корзину</fish-button>

      <fish-modal :visible.sync="show">
        <OptionContainer ref="optionsContainer">
          <component
            v-for="option of product_object.options"
            :key="option.uid"
            :is="option.type"
            :option="option"
            :sync="sync"
            @update="updateOption"
          ></component>
        </OptionContainer>
        <fish-button type="negative" @click="hideModal()">Закрыть</fish-button>
        <fish-button type="positive" @click="addToCart()">Добавить в корзину</fish-button>
      </fish-modal>
    </div>
  </div>
</template>

<script>
import Product from '~/classes/product/Product'
import IterativeProductOption from '~/components/product/IterativeProductOption'

export default {

  name: 'Product',

  props: {
    product: { type: Product }
  },

  components: {
    IterativeProductOption,
  },

  data() {
    return {
      product_object: null,
      show: false,
      sync: false,
      init: false,
    }
  },

  methods: {
    cloneOrigin() {
      this.product_object = _.cloneDeep(this.product);
    },
    showModal() {
      this.show = true;
    },
    hideModal() {
      this.show = false;
    },
    async addToCart() {
      this.sync = true;
      await this.$nextTick();
      this.$store.dispatch('cart/add', this.product_object);
      this.hideModal();
      this.sync = false;
    },
    updateOption(option) {
      const origin_option = _.find(this.product_object.options, (item) => item.uid === option.uid);
      Object.assign(origin_option, option);
    },
  },

  mounted() {
    this.cloneOrigin();
    console.log('клонирую');
    this.init = true;
  },
}
</script>
