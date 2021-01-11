<template>
  <section id="main">
    <nuxt class="main-content" />
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    computed: {
      ...mapGetters([
        'authenticated',
      ]),
    },

    watch: {
      authenticated(value) {
        if (!value) this.$router.push('/signin');
      },
    },
  };
</script>
