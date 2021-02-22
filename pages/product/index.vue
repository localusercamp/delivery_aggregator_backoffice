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

        <div></div>

        <div>
          <nuxt-link to="/product/create">
            <el-button round type="success">Создать</el-button>
          </nuxt-link>
        </div>
      </div>

      <!-- <div class="product-card-shadow">
        <img
          class="product-card-image"
          src="https://zdnet1.cbsistatic.com/hub/i/r/2018/12/04/3a6fd09a-e489-4d56-84e4-06ca9b181deb/resize/1200x900/d137c2ef8739fab722241753d1233315/apple-presents-best-of-2018-apps-12032018big-jpg-large.jpg"
        />
        <div class="product-card-body">
          <div class="text-title">asdasdasd</div>
        </div>
      </div> -->

      <div v-if="init">
        <ProductCard
          v-for="product of products"
          :key="product.uid"
          :product="product">
        </ProductCard>
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
