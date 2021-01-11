<template>
  <div>
    <div>Пользователь: {{ `${user.firstname} ${user.lastname}` }}</div>
    <div @click="logout()">Выйти</div>
    <div @click="drop()">drop</div>
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
    ...mapGetters([
      'user'
    ]),
  },

  methods: {
    logout() {
      this.$axios.post('auth/signout');
    },

    drop() {
      this.$store.dispatch('setAuth', ({}));
      this.$store.dispatch('setUser', ({}));
    },

    showUser() {
      console.log(this.user);
    },
  },

  middleware: ['authenticated'],
}
</script>
