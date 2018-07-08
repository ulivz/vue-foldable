import VueFoldable from 'vue-foldable'
import VueFoldableCsdn from '@vue-foldable/csdn'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('foldable', VueFoldable)
  Vue.component('csdn-foldable', VueFoldableCsdn)
  // ...apply enhancements to the app
}
