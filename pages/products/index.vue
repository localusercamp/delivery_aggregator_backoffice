<template>
  <div>
    лист всех продуктов

    <div v-if="init">
      <Product
        v-for="product of products"
        :key="product.uid"
        :product="product">
      </Product>
    </div>
  </div>
</template>

<script>
import Product from '~/classes/product/Product'

export default {

  data() {
    return {
      products: [],
      init: false,
    }
  },

  methods: {
    async fetchData() {
      await this.$axios.get('app/product')
        .then((response) => {
          this.products = Product.fabric(response.data.product_list);
        })
    }
  },

  async mounted() {
    await this.fetchData();
    this.init = true;
  },

  middleware: ['authenticated'],
}
</script>
