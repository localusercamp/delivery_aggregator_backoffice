<template>
  <div class="page-tpl">
    <div class="page-heading">
      <h1 class="page-title">Продукты</h1>
    </div>

    <div class="page-content">
      <el-row>
        <el-col :span="24" class="mb-4">
          <el-upload
            class="product-image-uploader d-inline-block"
            action="#"
            :show-file-list="false"
            :on-success="successfullyUploaded"
          >
            <img v-if="image_url" :src="image_url" class="product-image">
            <i v-else class="el-icon-plus product-image-uploader-icon"></i>
          </el-upload>
        </el-col>

        <el-col :span="24" class="mb-4">
          <label>Наименование</label>
          <el-input v-model="product.title" :maxlength="30"/>
        </el-col>

        <el-col :span="24" class="mb-4">
          <label>Описание</label>
          <el-input type="textarea" v-model="product.description"/>
        </el-col>

        <el-col :span="24" class="mb-4">
          <label>Цена</label>
          <el-input type="number" v-model="product.price"/>
        </el-col>

        <el-col :span="24">
          <label>Тэги</label>
          <div class="form-group">
            <el-select v-model="product.tags" multiple collapse-tags placeholder="Выберите тэги" class="w-100pr">
              <el-option v-for="tag of tags" :key="`tag_${tag.id}`" :value="tag.id" :label="tag.title"></el-option>
            </el-select>
          </div>
        </el-col>

        <el-col :span="24">
          <el-button type="success" class="w-100pr" @click="store()" :loading="loading">Создать</el-button>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import Product from '~/classes/product/Product'
import Tag from '~/classes/Tag'

export default {
  data() {
    return {
      image_url: '',
      product: null,
      poster: null,
      loading: false,
    }
  },

  async asyncData({app}) {
    const {tag_list} = await app.$axios.$get('app/tag');

    const product = new Product();
    const tags    = Tag.fabric(tag_list);

    return {
      product,
      tags,
    }
  },

  methods: {
    successfullyUploaded(res, file) {
      this.image_url = URL.createObjectURL(file.raw);
      this.poster = file;
    },

    dataIsValid() {
      if (!this?.poster?.raw) {
        this.$noty.error('Необходимо загрузить изображение.');
        return false;
      }
      return true;
    },

    store() {
      if (!this.dataIsValid()) return;

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();
      formData.append('poster', this.poster.raw);

      this.loading = true;
      this.$axios.put('/app/product', this.product)
        .then((response) => {
          this.$axios.post(`/app/product/${response.data.product.id}/change-poster`, formData, config)
            .then(() => {

            })
            .catch((e) => {
              const error_messages = err.response.data;
              for (const error_message of error_messages) {
                this.$noty.error(error_message);
              }
            })
        });
        this.$noty.error('ss');
      this.loading = false;
    },
  },

  middleware: ['authenticated'],
}
</script>
