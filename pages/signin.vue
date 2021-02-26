<template>
  <div>
    <div class="auth-card p-6">
      <h1> Вход </h1>
      <div class="row">
        <div class="col-xs-12">
          <div class="form-group">
            <label> Номер телефона </label>
            <MaskedInput
              mask="\+\7 (111) 111 11-11"
              placeholder="+7 (___) ___ __-__"
              class="form-control"
              @input="getValueFromMaskedInput"
            />
          </div>
          <div class="form-group">
            <label> Пароль </label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <el-button type="primary" @click="signin()" class="button basic w-100pr mt-2">
            Войти
          </el-button>
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

      this.$axios.post('auth/provider/signin', credentials)
        .then((response) => {
          console.log({expires_in: response.data.jwt.expires_in, now: Math.floor(Date.now() / 1000)});

          this.$store.dispatch('auth/setJWT', {
            access_token: response.data.jwt.access_token,
            expires: Math.floor(Date.now() / 1000) + response.data.jwt.expires_in,
          });
          this.$store.dispatch('user/setUser', response.data.user);
          this.$store.dispatch('cart/init');
          this.$router.push('/dashboard');
        })
        .catch((error) => console.log(error))
        .finally(() => this.loading = false);
    },

    getValueFromMaskedInput(masked, unmasked) {
      this.phone = unmasked.replace(/_/g, '');
    },
  },

  layout: 'auth',
  middleware: ['guest'],
}
</script>
