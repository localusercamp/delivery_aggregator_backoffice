<template>
  <div>
    <div class="auth-card p-6">
      <h1> Вход </h1>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label for="email"> Электронный адрес </label>
            <password-input 
              v-model="email"
              type="text"
              disableStrength
              disableToggle
            >
            </password-input>
          </div>
          <div class="form-group">
            <label for="password"> Пароль </label>
            <password-input 
              v-model="password"
              disableStrength
            >
            </password-input>
            <validation-alert v-model="errors" match="invalid_credentials"></validation-alert>
          </div>
          <fish-button
            type="primary"
            @click="signin()"
            class="button basic w100"
          >
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
      email: null,
      password: null,
      errors: null,
    };
  },

  methods: {
    signin() {
      this.$axios.$post('api/app/auth/signin', { email: this.email, password: this.password })
        .then((e) => {
          this.$store.dispatch('setAuth', {
            access_token: e.token.access_token,
            expires: Math.floor(Date.now() / 1000) + e.token.expires_in,
          });
          this.$store.dispatch('setUser', e.user);
          this.$router.push('/home');
        })
        .catch((error) => this.errors = error.response.data.errors)
        .finally(() => this.loading = false);
    },
  },

  middleware: ['guest'],

};
</script>
