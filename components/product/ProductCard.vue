<template>
  <div class="product-card-shadow">
    <img
      class="product-card-image"
      :src="product.poster.url"
    />
    <div class="product-card-body">
      <div class="text-title">{{ product.title }}</div>
    </div>
  </div>
</template>

<script>
import Product from '~/classes/product/Product'

export default {
  name: 'ProductCard',

  props: {
    product: { type: Product }
  },


}
</script>
