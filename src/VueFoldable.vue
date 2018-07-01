<template>
  <div class="vue-foldable">
    <div class="vue-foldable-container"
         :style="{ maxHeight: currentMaxHeight + 'px' }"
         ref="container">
      <slot></slot>
    </div>
    <slot name="view-more">
      <div class="foldable-view-more"
           @click="toggle"
           v-if="reachThreshold">
        <div class="view-more-mask" :class="{ 'show-mask': this.collapsed }"></div>
        <div class="view-more-text">
          <ArrowIcon class="view-more-icon"
                     :class="{ 'collapsed': this.collapsed }">
          </ArrowIcon>
          {{ collapsed ? 'View more' : 'Collapse' }}
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
  import ArrowIcon from './ArrowIcon.vue'
  const DEFAULT_VISUAL_HEIGHT = 100;

  export default {
    name: 'vue-foldable',

    components: { ArrowIcon },

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
        default: false
      },
      async: {
        type: Boolean,
        default: false
      },
      timeout: {
        type: Number,
        default: 3000
      }
    },

    data () {
      let height = this.height
      if (typeof this.height === 'number' && this.height < this.minHeight) {
        height = this.minHeight
      }
      return {
        collapsed: true,
        currentMaxHeight: height,
        threshold: height,
        reachThreshold: true,
        percentageMode: this.height.indexOf('%') !== -1,
        percentage: null
      }
    },

    created () {
      if (typeof this.height === 'string' && !this.percentageMode) {
        this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT
      }
      if (this.percentageMode) {
        this.percentage = parseInt(this.threshold.replace('%', '').trim()) / 100
      }
    },

    mounted () {
      this.handleMount()

      // Temporary hack since this.$nextTick still cannot ensure all the sub components rendered.
      // See: https://vuejs.org/v2/api/#mounted
      setTimeout(this.handleMount, 50)
      // this.$nextTick(function () {
      //     this.handleMount()
      // })

      if (this.async) {
        onElementHeightChange({
          el: this.$refs.container,
          callback: this.handleMount,
          timeout: this.timeout
        })
      }
    },

    methods: {
      handleMount() {
        this.calculateThreshold()
        this.checkReachThresfold()
      },

      checkReachThresfold () {
        this.reachThreshold = this.$refs.container.scrollHeight > this.threshold
      },

      calculateThreshold() {
        if (this.percentageMode) {
          let calculatedHeight = this.$refs.container.scrollHeight * this.percentage
          if (calculatedHeight < this.minHeight) {
            calculatedHeight = this.minHeight
          }
          this.currentMaxHeight = calculatedHeight
          this.threshold = calculatedHeight
        }
      },

      toggle () {
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
      }
    }
  }

  function onElementHeightChange ({
    el,
    callback,
    timeout
  }) {
    let oldHeight = el.scrollHeight, newHeight
    let poller
    let interval = 100
    let count = 0
    let maxCount = timeout / interval

    function unit () {
      count++
      newHeight = el.scrollHeight
      if (oldHeight !== newHeight) {
        console.log(oldHeight)
        console.log(newHeight)
        callback(newHeight)
        if (poller) {
          clearTimeout(poller)
        }
      }
      oldHeight = newHeight
      if (count <= maxCount) {
        poller = setTimeout(unit, interval)
      } else {
        console.warn('Finished')
      }
    }

    unit()
  }
</script>
