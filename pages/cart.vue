<template>
  <div>
    <div v-for="product of cartItems" :key="product.uid">
      <div class="row">
        <div class="col-xs-12">
          <ProductCard :product="product"></ProductCard>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <el-button type="negative" @click="remove(product.uid)" class="d-inline-block">удалить</el-button>
        </div>
      </div>
    </div>
    <div @click="show()">show</div>
    <el-button @click="flush()" type="negative">Очистить корзину</el-button>
  </div>
</template>

<script>
import Product from '~/classes/product/Product'
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
      init: false,
    }
  },

  computed: {
    ...mapGetters({
      cart: 'cart/cart'
    }),
    cartItems() {
      if (this.init) {
        const products = _.cloneDeep(this.cart.items);
        return Product.fabric(products);
      }
      return [];
    },
  },

  methods: {
    show() {
      console.log(this.cart.items);
    },
    flush() {
      this.$store.dispatch('cart/flush');
    },
    remove(uid) {
      this.$store.dispatch('cart/remove', uid);
    },
  },

  mounted() {
    this.init = true;
  },

  middleware: ['authenticated'],
}
</script>
