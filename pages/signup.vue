<template>
  <div>
    <div class="auth-card p-6">
      <h1> Регистрация </h1>
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
            <label>Пароль</label>
            <input v-model="password" type="password" class="form-control" />
          </div>
          <div v-if="statemanager.isInCodeVerificationState" class="form-group">
            <label>Код из СМС</label>
            <input v-model="code" class="form-control" />
          </div>
          <el-button v-if="statemanager.isInCredentailsState" type="primary" @click="toVerification()" class="button basic w-100pr mt-2">
            Продолжить
          </el-button>
          <el-button v-if="statemanager.isInCodeVerificationState" type="primary" @click="signup()" class="button basic w-100pr mt-2">
            Зарегистрироваться
          </el-button>
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

import StateManager from '~/classes/StateManager'

const statemanager = new StateManager(['credentails', 'code_verification']);

export default {

  name: 'dsf',
  data() {
    return {
      phone: null,
      password: null,
      strength: 0,
      errors: null,
      code: null,

      statemanager,
    };
  },

  methods: {
    toVerification() {
      const credentials = {
        phone: this.phone,
        password: this.password,
      };

      this.$axios.$post('auth/provider/send-verification-sms', credentials)
        .then(() => {
          this.statemanager.switchToCodeVerificationState();
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

    getValueFromMaskedInput(masked, unmasked) {
      this.phone = unmasked.replace(/_/g, '');
    },
  },

  layout: 'auth',
  middleware: ['guest'],
}
</script>
