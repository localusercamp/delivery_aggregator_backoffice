<template>
  <div>
    лист всех продуктов

    <Product :product="4"></Product>
  </div>
</template>

<script>
export default {

  data() {
    return {
    }
  },

  methods: {
    fetchData() {
      this.$axios.get('app/products')
        .then((response) => {

        })
    }
  },

  middleware: ['authenticated'],
}
</script>
