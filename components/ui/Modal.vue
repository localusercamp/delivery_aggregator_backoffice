<template>
  <div v-if="visible" class="tm-dimmer" @click.self="clickoutside()">
    <div class="tm-modal" :style="modalStyle">
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
      visible: { type: Boolean, default: false },
      width: { type: [Number, String], default: 850 },
    },

    data () {
      return {
        left: '50%',
        top: '0px',
        marginLeft: this.width / 2,
        marginTop: '100px',
        loading: false,
      }
    },

    computed: {
      modalStyle() {
        const { left, top } = this
          return {
            'margin-top': this.marginTop,
            'width': `${this.width}px`,
            'margin-left': `-${this.marginLeft}px`,
            left,
            top
          }
      },
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
