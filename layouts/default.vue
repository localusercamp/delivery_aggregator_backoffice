<template>
  <section id="main">
    <nuxt class="main-content" />
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Header from '@/pages/Header';
  import Footer from '../components/Footer.vue';

  export default {

    components: {
      Header,
      Footer,
    },

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
