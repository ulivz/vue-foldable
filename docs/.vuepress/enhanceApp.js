import VueFoldable from '../../dist/vue-foldable.es'
import '../../dist/vue-foldable.css'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('foldable', VueFoldable)
  // ...apply enhancements to the app
}
