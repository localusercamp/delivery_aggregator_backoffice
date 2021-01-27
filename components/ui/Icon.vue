<template>
  <div>
    <div :class="classList"></div>
  </div>
</template>

<script>
export default {
  name: 'tm-icon',

  props: {
    type: {
      type: String,
    },
    size: {
      type: String,
      default: 'standart',
    },
  },

  computed: {
    classList() {
      return [
        'icon',
        this.type,
        `size-${this.size}`,
      ];
    }
  }
}
</script>
