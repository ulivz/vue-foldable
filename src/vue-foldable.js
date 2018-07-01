const DEFAULT_VISUAL_HEIGHT = 100;

export default {
  name: 'vue-foldable',

  props: {
    minHeight: {
      type: Number,
      default: DEFAULT_VISUAL_HEIGHT,
    },
    height: {
      type: [Number, String],
      default: DEFAULT_VISUAL_HEIGHT,
    },
    once: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    let height = this.height
    if (typeof this.height === 'number' && this.height < this.minHeight) {
      height = this.minHeight
    }
    return {
      collapsed: true,
      currentMaxHeight: height,
      threshold: height,
      reachThreshold: true,
      percentageMode: this.height.indexOf('%') !== -1
    }
  },

  created() {
    if (typeof this.height === 'string' && !this.percentageMode) {
      this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT
    }
  },

  mounted() {
    const maxHeight = this.$refs.container.scrollHeight
    if (this.percentageMode) {
      const threshold = parseInt(this.threshold.replace('%', '').trim())
      let calculatedHeight = this.$refs.container.scrollHeight * threshold / 100
      if (calculatedHeight < this.minHeight) {
        calculatedHeight = this.minHeight
      }
      this.currentMaxHeight = this.threshold = calculatedHeight
    }
    if (maxHeight < this.threshold) {
      this.reachThreshold = false
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
        if (this.once) {
          this.reachThreshold = false
        }
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

      this.reachThreshold
        ? h('div', { class: ['foldable-view-more'], on: { click: this.toggle } }, [
        h('div', { class: { 'view-more-mask': true, 'show-mask': this.collapsed } }),
        h('div', { class: ['view-more-text'] }, [this.collapsed ? 'View more' : 'Collapse']),
      ])
        : null
    ])
  },
}
