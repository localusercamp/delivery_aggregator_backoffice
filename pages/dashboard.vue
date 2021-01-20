<template>
  <div>
    <div>Пользователь: {{ `${user.firstname} ${user.lastname}` }}</div>
    <div @click="logout()">Выйти</div>
    <br>

    <div class="row">
      <div class="col-md-2">
        <nuxt-link to="products/create">
          <button>
            Создать продукт
          </button>
        </nuxt-link>
        <nuxt-link to="products">
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
      user: 'user/user'
    }),
  },

  methods: {
    logout() {
      this.$axios.post('auth/signout').then((response) => {
        this.$store.dispatch('signout');
      });
    },
  },

  middleware: ['authenticated'],
}
</script>
