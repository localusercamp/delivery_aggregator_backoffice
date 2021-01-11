<template>
  <div>
    <div class="auth-card p-6">
      <h1> Регистрация </h1>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label> Номер телефона </label>
            <input v-model="phone" class="form-control" />
          </div>
          <div class="form-group">
            <label>Пароль</label>
            <input v-model="password" class="form-control" />
          </div>
          <fish-button type="primary" @click="signup()" class="button basic w-100pr mt-2">
            Зарегистрироваться
          </fish-button>
          <div class="row">
            <div class="text-center mt-2">
              <NuxtLink to="/signin" class="text-center">Уже зарегистрированы? Войти</NuxtLink>
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
      strength: 0,
      errors: null,
    };
  },

  methods: {
    signup() {
      this.loading = true;

      const credentials = {
        phone: this.phone,
        password: this.password,
      };

      this.$axios.$post('auth/provider/signup', credentials)
        .then((response) => {
          this.$router.push('/signin');
        })
        .catch((error) => this.errors = error.response.data.errors)
        .finally(() => this.loading = false);
    },
  },

  middleware: ['guest'],

}
</script>
