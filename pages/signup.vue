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
          <div v-if="isInCodeVerificationState" class="form-group">
            <label>Код из СМС</label>
            <input v-model="code" class="form-control" />
          </div>
          <fish-button v-if="isInCredentailsState" type="primary" @click="toVerification()" class="button basic w-100pr mt-2">
            Продолжить
          </fish-button>
          <fish-button v-if="isInCodeVerificationState" type="primary" @click="signup()" class="button basic w-100pr mt-2">
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

const CREDENTAILS_STATE = 1;
const CODE_VERIFICATION_STATE = 2;

export default {
  data() {
    return {
      phone: null,
      password: null,
      strength: 0,
      errors: null,
      code: null,

      state: CREDENTAILS_STATE,
    };
  },

  computed: {
    isInCredentailsState() {
      return this.state === CREDENTAILS_STATE;
    },
    isInCodeVerificationState() {
      return this.state === CODE_VERIFICATION_STATE;
    }
  },

  methods: {
    toVerification() {
      const credentials = {
        phone: this.phone,
        password: this.password,
      };

      this.$axios.$post('auth/provider/send-verification-sms', credentials)
        .then(() => {
          this.state = CODE_VERIFICATION_STATE;
        })
    },

    signup() {
      this.loading = true;

      const credentials = {
        phone: this.phone,
        password: this.password,
        code: this.code,
      };

      this.$axios.$post('auth/provider/signup', credentials)
        .then(() => {
          // this.$router.push('/signin');
          this.$axios.post('auth/provider/signin', credentials)
            .then((response) => {
              this.$store.dispatch('auth/setJWT', {
                access_token: response.data.jwt.access_token,
                expires: Math.floor(Date.now() / 1000) + response.data.jwt.expires_in,
              });
              this.$store.dispatch('user/setUser', response.data.user);
              this.$store.dispatch('cart/init');
              this.$router.push('/dashboard');
            })
        })
        .finally(() => this.loading = false);
    },
  },

  layout: 'auth',
  middleware: ['guest'],
}
</script>
