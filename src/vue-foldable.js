export default {
  name: 'vue-foldable',

  props: {
    initialHeight: {
      type: Number,
      default: 0,
    }
  },

  render(h) {
    return h('div', { class: ['vue-foldable'] }, [
      h('div', {
        style: { maxHeight: this.maxHeight + 'px' },
        class: ['vue-foldable-container'],
        ref: 'container'
      }, this.$slots.default),

      h('div', { class: ['foldable-view-more'], on: { click: this.toggle } }, [
        h('div', { class: { 'view-more-mask': true, 'show-mask': this.collapsed } }),
        h('div', { class: ['view-more-text'] }, [this.collapsed ? 'View more' : 'Collapse']),
      ])
    ])
  },

  data() {
    return {
      collapsed: true,
      maxHeight: this.initialHeight,
    }
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed
      if (this.collapsed) {
        this.maxHeight = this.initialHeight
      } else {
        // explicitly set max height so that it can be transitioned
        this.maxHeight = this.$refs.container.scrollHeight
      }
    },

    setMaxHeight(maxHeight = maxHeight) {
      this.maxHeight = maxHeight
    }
  }
}
