// create package.json and README for packages that don't have one yet

const fs = require('fs')
const path = require('path')
const baseVersion = require('../packages/vue-foldable/package.json').version

const packagesDir = path.resolve(__dirname, '../packages/@vue-foldable')
const files = fs.readdirSync(packagesDir)

files.forEach(pkg => {
  if (pkg.charAt(0) === '.') return

  const desc = `${pkg} style of vue-foldable`

  const pkgPath = path.join(packagesDir, pkg, `package.json`)
  if (!fs.existsSync(pkgPath)) {
    const json = {
      'name': `@vue-foldable/${pkg}`,
      'version': baseVersion,
      'description': desc,
      "main": `dist/${pkg}.cjs.js`,
      "module": `dist/${pkg}.es.js`,
      "unpkg": `dist/${pkg}.js`,
      "jsdelivr": `dist/${pkg}.js`,
      'publishConfig': {
        'access': 'public'
      },
      'repository': {
        'type': 'git',
        'url': 'git+https://github.com/ulivz/vue-foldable.git'
      },
      "scripts": {
        "build": `bili --plugin vue --js buble --format es,umd,cjs --module-name VueFoldable${upperFisrtChar(pkg)}`,
        "dev": "yarn build --watch"
      },
      'keywords': [
        'vue-foldable',
        "foldable",
        "callapse",
        "summary",
        pkg,
      ],
      "author": "ULIVZ <chl814@foxmail.com>",
      "license": "MIT",
      "bugs": {
        "url": "https://github.com/ulivz/vue-foldable/issues"
      },
      "homepage": "https://github.com/ulivz/vue-foldable#readme",
    }
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, pkg, `README.md`)
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# @vue-foldable/${pkg}\n\n> ${desc}`)
  }

  const npmIgnorePath = path.join(packagesDir, pkg, `.npmignore`)
  if (!fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, `dist\n__tests__/\n__mocks__/`)
  }
})

function upperFisrtChar (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
