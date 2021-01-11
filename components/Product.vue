<template>
  <div>
    продукт
  </div>
</template>

<script>
import Product from '~/classes/Product'

export default {

  name: 'Product',

  props: {
    product: { type: Product }
  },

  data() {
    return {

    }
  },

  methods: {
  },
}
</script>
