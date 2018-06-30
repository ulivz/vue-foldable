const DEFAULT_VISUAL_HEIGHT = 100;

export default {
  name: 'vue-foldable',

  props: {
    initialHeight: {
      type: [Number, String],
      default: DEFAULT_VISUAL_HEIGHT,
    }
  },

  data() {
    return {
      collapsed: true,
      currentMaxHeight: this.initialHeight,
      threshold: this.initialHeight,
      percentageMode: this.initialHeight.indexOf('%') !== -1
    }
  },

  created() {
    if (typeof this.initialHeight === 'string' && !this.percentageMode) {
      this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT
    }
  },

  mounted() {
    if (this.percentageMode) {
      const threshold = parseInt(this.threshold.replace('%', '').trim())
      console.log(threshold)
      console.log(this.$refs.container.scrollHeight)
      this.currentMaxHeight = this.threshold = this.$refs.container.scrollHeight * threshold / 100
    }
  },

  methods: {
    toggle() {
      this.collapsed = !this.collapsed
      if (this.collapsed) {
        this.currentMaxHeight = this.threshold
      } else {
        // explicitly set max height so that it can be transitioned
        this.currentMaxHeight = this.$refs.container.scrollHeight
      }
    },

    setMaxHeight(maxHeight = maxHeight) {
      this.currentMaxHeight = maxHeight
    }
  },

  render(h) {
    return h('div', { class: ['vue-foldable'] }, [
      h('div', {
        style: { maxHeight: this.currentMaxHeight + 'px' },
        class: ['vue-foldable-container'],
        ref: 'container'
      }, this.$slots.default),

      h('div', { class: ['foldable-view-more'], on: { click: this.toggle } }, [
        h('div', { class: { 'view-more-mask': true, 'show-mask': this.collapsed } }),
        h('div', { class: ['view-more-text'] }, [this.collapsed ? 'View more' : 'Collapse']),
      ])
    ])
  },
}
