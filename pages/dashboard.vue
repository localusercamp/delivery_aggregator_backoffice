<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <nuxt-link to="/product/create">
          <button>
            Создать продукт
          </button>
        </nuxt-link>
        <nuxt-link to="/product">
          <button>
            Все продукты
          </button>
        </nuxt-link>
        <nuxt-link to="cart">
          <button>
            Моя корзина
          </button>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  data() {
    return {
    }
  },

  computed: {
    ...mapGetters({
    }),
  },

  middleware: ['authenticated'],
}
</script>
