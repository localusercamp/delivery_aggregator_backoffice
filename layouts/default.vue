<template>
  <section class="main" id="main">
    <div class="container-fluid">
      <div class="row">
        <div class="sidebar">
          <Sidebar ref="sidenav"></Sidebar>
        </div>
        <div class="main-content">
          <transition name="slide-fade" mode="out-in" appear>
            <nuxt/>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Sidebar from '~/components/Sidebar';

  export default {

    computed: {
      ...mapGetters({
        authenticated: 'auth/authenticated',
      }),
    },

    components: {
      Sidebar,
    },

    watch: {
      authenticated(value) {
        if (!value) this.$router.push('/signin');
      },
    },
  };
</script>
