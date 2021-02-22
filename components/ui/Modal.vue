<template>
  <div v-if="visible" class="tm-dimmer" @click.self="clickoutside()">
    <div class="tm-modal">
      <div class="row">
        <div class="col-xs-12">
          <slot name="header"></slot>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <slot name="body"></slot>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'tm-modal',

    props: {
      visible: { type: Boolean, default: false }
    },

    data() {
      return {
        loading: false,
      }
    },

    methods: {
      closeModal() {
        this.$emit('update:visible', false);
      },
      clickoutside() {
        this.closeModal();
      },
    },
  }
</script>
