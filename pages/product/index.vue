<template>
  <div class="page-tpl">
    <div class="page-heading">
      <h1 class="page-title">Продукты</h1>
    </div>

    <div class="page-content">
      <div class="panel-round-menu mb-6">
        <div>
          <el-input class="input-round">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>

        <div>
          <nuxt-link to="/product/create">
            <el-button round type="success">Создать</el-button>
          </nuxt-link>
        </div>
      </div>

      <div v-if="init">
        <ProductCard v-for="product of products"
          :key="product.uid"
          :product="product"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Product from "~/classes/product/Product";

export default {
  data() {
    return {
      products: [],
      init: false,
    };
  },

  methods: {
    async fetchData() {
      await this.$axios.get("app/product").then((response) => {
        this.products = response.data.product_list;
        Product.$adopt(this.products);
        this.user = this.$store.getters['user/user'];
        console.log(this.user);
      });
    },

    toggle() {
      this.show_modal = !this.show_modal;
    },
  },

  async mounted() {
    await this.fetchData();
    this.init = true;
  },

  middleware: ["authenticated"],
};
</script>
