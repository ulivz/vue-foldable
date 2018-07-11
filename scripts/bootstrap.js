// create package.json and README for packages that don't have one yet

const fs = require('fs')
const path = require('path')
const baseVersion = require('../packages/vue-foldable/package.json').version

const packagesDir = path.resolve(__dirname, '../packages')
const files = fs.readdirSync(packagesDir).map(dirname => ({
  dirname,
  name: dirname.replace('vue-foldable-', ''),
  pkgJsonPath: path.join(packagesDir, dirname, `package.json`)
}))

files.forEach(({
  pkgJsonPath,
  dirname,
  name
}) => {
  if (dirname.charAt(0) === '.') return

  const desc = `${name} foldable component for vue.js`

  if (!fs.existsSync(pkgJsonPath)) {
    const json = {
      'name': `@vue-foldable/${name}`,
      'version': baseVersion,
      'description': desc,
      "main": `dist/${name}.cjs.js`,
      "module": `dist/${name}.es.js`,
      "unpkg": `dist/${name}.js`,
      "jsdelivr": `dist/${name}.js`,
      'publishConfig': {
        'access': 'public'
      },
      'repository': {
        'type': 'git',
        'url': 'git+https://github.com/ulivz/vue-foldable.git'
      },
      'keywords': [
        'vue-foldable',
        "foldable",
        "callapse",
        "summary",
        name,
      ],
      "author": "ULIVZ <chl814@foxmail.com>",
      "license": "MIT",
      "bugs": {
        "url": "https://github.com/ulivz/vue-foldable/issues"
      },
      "homepage": "https://github.com/ulivz/vue-foldable#readme",
    }
    fs.writeFileSync(pkgJsonPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, dirname, `README.md`)
  if (!fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# @vue-foldable/${name}\n\n> ${desc}`)
  }

  const npmIgnorePath = path.join(packagesDir, dirname, `.npmignore`)
  if (!fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, `dist\n__tests__/\n__mocks__/`)
  }
})

function upperFisrtChar (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
