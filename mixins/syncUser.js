export const syncUser = {
  methods: {
    syncUser() {
      this.$axios.$get('app/user/sync')
        .then((response) => {
          this.$store.dispatch('user/setUser', response.user);
        })
    }
  }
};
