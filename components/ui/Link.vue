<template>
  <div>
    <a :href="to" :class="getClass" @click.prevent="clickHandler">
      <slot></slot>
    </a>
  </div>
</template>

<script>
export default {
  name: 'tm-link',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: false,
    },
  },

  computed: {
    getClass() {
      return [
        this.disabled ? '' : 'clickable',
      ];
    },
  },

  methods: {
    clickHandler() {
      if (!this.disabled) {
        this.$emit('click');
        this.$router.push(this.to);
      }
    },
  },
}
</script>
