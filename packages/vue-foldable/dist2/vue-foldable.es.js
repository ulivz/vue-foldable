/*!
 * vue-foldable v0.2.1
 * (c) 2016-preset ULIVZ
 * Released under the MIT License.
 */
var ArrowIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 49.484 28.284"}},[_c('g',{attrs:{"transform":"translate(-229 -126.358)"}},[_c('rect',{attrs:{"fill":"#4dba87","width":"35","height":"5","rx":"2","transform":"translate(229 151.107) rotate(-45)"}}),_vm._v(" "),_c('rect',{attrs:{"fill":"#4dba87","width":"35","height":"5","rx":"2","transform":"translate(274.949 154.642) rotate(-135)"}})])])},staticRenderFns: [],
};

const DEFAULT_VISUAL_HEIGHT = 100;

var VueFoldable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-foldable"},[_c('div',{ref:"container",staticClass:"vue-foldable-container",style:({ maxHeight: _vm.currentMaxHeight + 'px' })},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"vue-foldable-mask",class:{ 'collapsed': _vm.collapsed }}),_vm._v(" "),_vm._t("view-more",[(_vm.reachThreshold)?_c('div',{staticClass:"vue-foldable-view-more",class:{ 'collapsed': _vm.collapsed },on:{"click":_vm.toggle}},[_c('ArrowIcon',{staticClass:"vue-foldable-icon",class:{ 'collapsed': _vm.collapsed }}),_vm._v(" "),_c('span',{staticClass:"text"},[_vm._v(_vm._s(_vm.collapsed ? 'View more' : 'Collapse'))])],1):_vm._e()],{toggle:_vm.toggle,collapsed:_vm.collapsed})],2)},staticRenderFns: [],
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
    let height = this.height;
    if (typeof this.height === 'number' && this.height < this.minHeight) {
      height = this.minHeight;
    }
    return {
      collapsed: true,
      currentMaxHeight: height,
      threshold: height,
      reachThreshold: true,
      percentageMode: typeof this.height === 'string' && this.height.indexOf('%') !== -1,
      percentage: null
    }
  },

  created () {
    if (typeof this.height === 'string' && !this.percentageMode) {
      this.currentMaxHeight = this.threshold = DEFAULT_VISUAL_HEIGHT;
    }
    if (this.percentageMode) {
      this.percentage = parseInt(this.threshold.replace('%', '').trim()) / 100;
    }
  },

  mounted () {
    this.handleMount();

    // Temporary hack since this.$nextTick still cannot ensure all the sub components rendered.
    // See: https://vuejs.org/v2/api/#mounted
    setTimeout(this.handleMount, 50);
    // this.$nextTick(function () {
    //     this.handleMount()
    // })

    if (this.async) {
      onElementHeightChange({
        el: this.$refs.container,
        callback: this.handleMount,
        timeout: this.timeout
      });
    }
  },

  methods: {
    handleMount() {
      const contentHeight = this.$refs.container.scrollHeight;
      this.calculateThreshold(contentHeight);
      this.checkReachThresfold(contentHeight);
    },

    checkReachThresfold (contentHeight) {
      this.reachThreshold = contentHeight > this.threshold;
    },

    calculateThreshold(contentHeight) {
      if (this.percentageMode) {
        let calculatedHeight = contentHeight * this.percentage;
        if (calculatedHeight < this.minHeight) {
          calculatedHeight = this.minHeight;
        }
        this.currentMaxHeight = calculatedHeight;
        this.threshold = calculatedHeight;
      }
    },

    toggle () {
      this.collapsed = !this.collapsed;
      if (this.collapsed) {
        this.currentMaxHeight = this.threshold;
      } else {
        // explicitly set max height so that it can be transitioned
        this.currentMaxHeight = this.$refs.container.scrollHeight;
        if (this.once) {
          this.reachThreshold = false;
        }
      }
    }
  }
};

function onElementHeightChange ({
  el,
  callback,
  timeout
}) {
  let oldHeight = el.scrollHeight, newHeight;
  let poller;
  let interval = 100;
  let count = 0;
  let maxCount = timeout / interval;

  function unit () {
    count++;
    newHeight = el.scrollHeight;
    if (oldHeight !== newHeight) {
      callback(newHeight);
      if (poller) {
        clearTimeout(poller);
      }
    }
    oldHeight = newHeight;
    if (count <= maxCount) {
      poller = setTimeout(unit, interval);
    }
  }

  unit();
}

export default VueFoldable;
/* follow me on Twitter! @_ulivz */
