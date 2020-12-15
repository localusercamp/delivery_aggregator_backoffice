<template>
  <div>
    <div class="auth-card p-6">
      <h1> Регистрация </h1>
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
            <validation-alert v-model="errors" match="email"></validation-alert>
          </div>
          <div class="form-group">
            <label for="password"> Пароль </label>
            <password-input 
              v-model="password"
              :strength="strength"
              @input="updateStrength"
            >
            </password-input>
            <validation-alert v-model="errors" match="password"></validation-alert>
          </div>
          <fish-button
            type="primary"
            @click="signup()"
            class="button basic w100"
          >
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
      email: null,
      password: null,
      strength: 0,
      errors: null,
    };
  },

  methods: {
    signup() {
      this.loading = true;

      const credentials = { 
        email: this.email, 
        password: this.password,
      };

      this.$axios.$post('api/app/auth/signup', credentials)
        .then((response) => {
          this.$router.push('/signin');
        })
        .catch((error) => this.errors = error.response.data.errors)
        .finally(() => this.loading = false);
    },

    updateStrength(input) {
      if (input.length < 2)
        this.strength = 0;
      else if (input.length < 4)
        this.strength = 1;
      else if (input.length < 6)
        this.strength = 2;
      else if (input.length < 8)
        this.strength = 3;
      else if (input.length < 10)
        this.strength = 4;
    }
  },

  middleware: ['guest'],

};
</script>
