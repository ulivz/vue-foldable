const fs = require('fs')
const path = require('path')

module.exports = {
  title: "vue-foldable",
  description: "foldable component for vue.js",

  // See: https://vuepress.vuejs.org/config/#base
  base: "/vue-foldable/",

  // Extra tags to be injected to the page HTML <head>
  // See: https://vuepress.vuejs.org/config/#head
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  // Global stylus file registration
  // See: https://vuepress.vuejs.org/config/#stylus
  stylus: {
    import: [path.resolve(__dirname, './style/config.styl')]
  },

  // PWA support
  // See: https://vuepress.vuejs.org/config/#serviceworker
  serviceWorker: true,

  // See: https://vuepress.vuejs.org/default-theme-config/#homepage
  themeConfig: {
    repo: "ULIVZ/vue-foldable",
    editLinks: true,
    docsDir: 'docs',
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    sidebar: inferSiderbars()
  }
}

/**
 * If you want to create a docs that automatically lists all files in all subdirectories,
 * This method will help you complete this task.
 *
 * If you do not prefer this preset, just remove it and configure it according to the
 * docs: https://vuepress.vuejs.org/default-theme-config/#sidebar
 *
 * @returns {Array}
 */
function inferSiderbars () {
  // You will need to update this config when directory was added or removed.
  const sidebars = [
    { title: 'JavaScript', dirname: 'javascript' },
    { title: 'CSS', dirname: 'css' },
  ]
  return sidebars.map(({ title, dirname }) => {
    const dirpath = path.resolve(__dirname, '../' + dirname)
    return {
      title,
      collapsable: false,
      children: fs
        .readdirSync(dirpath)
        .filter(item => item.endsWith('.md') && fs.statSync(path.join(dirpath, item)).isFile())
        .map(item => dirname + '/' + item.replace(/(README)?(.md)$/, ''))
    }
  })
}
