<template>
  <div>
    <div class="auth-card p-6">
      <h1> Вход </h1>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label> Номер телефона </label>
            <input v-model="phone" class="form-control" />
          </div>
          <div class="form-group">
            <label> Пароль </label>
            <input v-model="password" class="form-control" />
          </div>
          <fish-button type="primary" @click="signin()" class="button basic w-100pr mt-2">
            Войти
          </fish-button>
          <div class="row">
            <div class="text-center mt-2">
              <NuxtLink to="/signup" class="text-center">Еще не зарегистрированы? <br> Регистрация</NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      phone: null,
      password: null,
      errors: null,
    };
  },

  methods: {
    signin() {
      const credentials = {
        phone: this.phone,
        password: this.password,
      };

      this.$axios.$post('auth/provider/signin', credentials)
        .then((response) => {
          this.$store.dispatch('setAuth', {
            access_token: response.jwt.access_token,
            expires: Math.floor(Date.now() / 1000) + response.jwt.expires_in,
          });
          this.$store.dispatch('setUser', response.user);
          this.$router.push('/dashboard');
        })
        .catch((error) => this.errors = error.response.data.errors)
        .finally(() => this.loading = false);
    },
  },

  middleware: ['guest'],
}
</script>
