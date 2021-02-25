<template>
  <aside>
    <div class="heading">
      <div class="logo-wrapper">
        <!-- <nuxt-link :to="user.startRoute" class="logo" title="Туристическая платформа Югры">
        </nuxt-link> -->
      </div>
    </div>

    <nav>
      <ul>
        <li><nuxt-link to="/product"><tm-icon type="info" size="small" class="nav-icon"/>Продукты</nuxt-link></li>
        <li><nuxt-link to="/dashboard"><tm-icon type="info" size="small" class="nav-icon"/> дэшбоард </nuxt-link></li>
        <li @click="signout()"><a>Выйти</a></li>
      </ul>
    </nav>

  </aside>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'sidebar',
    props: {
      menuList: {
        type: Array,
        default() {
          return [];
        },
      },
    },

    computed: {
      ...mapGetters({
        user: 'user/user'
      }),
      // isCompanyApproved() {
      //   return !!this.user?.company?.approved_at;
      // },
      // isRoleModerator() {
      //   return this.user.isModerator;
      // },
      // canSubscribe() {
      //   return this.user.isAdmin || this.user.isModerator;
      // },
    },

    methods: {
      reroute(index) {
        console.log(index);
        // this.$router.push(index);
        // return true;
      },
      signout() {
        this.$axios.post('auth/signout');
        this.$store.dispatch('signout');
      },
      // lockBodyScroll() {
      //   document.body.style.overflowY = 'hidden';
      // },
      // unlockBodyScroll() {
      //   document.body.style.overflowY = 'auto';
      // },
      // subscribe() {
      //   this.$comet.restart({dev_id: this.$config.cometDevId, user_id: this.user.id, user_key: this.user.hash});
      //   this.pipe_id = this.$comet.subscription('on_moderation_counters', this.countersHandler);
      //   console.log('subscribed!');
      // },
      // countersHandler({data}) {
      //   this.applyCounterValue(data);
      // },
      // applyCounterValue(counter) {
      //   _.forEach(counter, (value, key) => {
      //     this.counters[key] = value;
      //   });
      // },
    },
    mounted() {
      if (this.canSubscribe) {
        this.$axios.$get('api/app/additional/sidebar-counters')
          .then((res) => _.forEach(res.counters, (value, key) => this.applyCounterValue({[key]:value})))
          .finally(() => this.subscribe());
      }
    },
  };
</script>
