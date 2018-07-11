const rollup = require('rollup');
const fs = require('fs')
const path = require('path')

const packagesDir = path.resolve(__dirname, '../packages')
const packages = fs.readdirSync(packagesDir)

let target = process.argv[2]

/**
 * Normalize build target
 */
if (!target) {
  target = packages
} else if (packages.indexOf(target) !== -1) {
  target = [target]
} else {
  console.error('Cannot find package: ' + target)
  process.exit(1)
}

const formats = ['umd', 'cjs', 'es']

target = packages.map(normalizePackage)
const configs = getBuildingConfigs(target)

async function build () {
  await Promise.all(configs.map(async ({ inputOptions, outputOptions }) => {
    const bundle = await rollup.rollup(inputOptions, outputOptions)
    await bundle.write(outputOptions)
  }))
}

build().then(() => console.log('[OK]'))

/**
 * Get rollup building configurations
 * @param target
 */
function getBuildingConfigs (target) {
  return target.map(({ dirname, name, version, entry, outDir, styleFilename }) => {
    return formats.map(format => {
      return {
        inputOptions: getInputOptions({ entry, outDir, styleFilename }),
        outputOptions: getOutputOptions({ outDir, name, version, format })
      }
    })
  }).reduce((prev, next) => prev.concat(next))
}

function getInputOptions ({
  entry,
  outDir,
  styleFilename
}) {
  const vue = require('rollup-plugin-vue')
  const babel = require('rollup-plugin-babel')
  const nodeRequire = require('rollup-plugin-node-resolve')
  return {
    input: entry,
    plugins: [
      vue({
        css: path.resolve(outDir, styleFilename)
      }),
      babel({
        babelrc: false,
        presets: [
          [
            '@babel/preset-env', {
            // https://github.com/rollup/rollup-plugin-babel#modules
            modules: false,
            targets: {
              browsers: ["last 2 versions", "safari >= 7"]
            }
          }
          ]
        ]
      }),
      nodeRequire()
    ]
  }
}

function getOutputOptions ({
  outDir,
  format,
  name,
  version
}) {
  // Refer to: https://rollupjs.org/guide/en#big-list-of-options
  return {
    name: normalizePackageName(name),
    dir: outDir,
    file: normalizeFileName(name, 'js', format),
    format,
    banner: getBanner({ name, version }),
    footer: '/* follow me on Twitter! @_ulivz */'
  }
}

function getBanner ({
  name,
  version
}) {
  return `/*!
 * ${name} v${version}
 * (c) 2016-preset ULIVZ
 * Released under the MIT License.
 */`
}

function normalizePackage (dirname) {
  const pkgPath = path.resolve(__dirname, `../packages/${dirname}/package.json`)
  const { name, version } = require(pkgPath)
  return {
    dirname,
    entry: path.resolve(__dirname, `../packages/${dirname}/src/index.js`),
    outDir: path.resolve(__dirname, `../packages/${dirname}/dist`),
    styleFilename: normalizeFileName(name, 'css'),
    name,
    version
  }
}

/**
 * Example:
 * vue-foldable => vue-foldable[.format].js
 * @vue-foldable/csdn => csdn[.format].js
 *
 * @param name
 * @param extension
 * @param format
 * @returns {string}
 */
function normalizeFileName (name, extension, format) {
  if (name.startsWith('@')) {
    name = name.slice(name.lastIndexOf('/') + 1)
  }
  if (format === 'umd' || !format) {
    return `${name}.${extension}`
  }
  return `${name}.${format}.${extension}`
}

/**
 * Example:
 * vue-foldable => VueFoldable
 * @vue-foldable/csdn => VueFoldableCsdn
 *
 * @param name
 */
function normalizePackageName (name) {
  if (name.startsWith('@')) {
    name = name.slice(1)
  }
  return name.replace(/(^|-|\/)(.)/g, (match, s1, s2) => {
    return s2.toUpperCase()
  })
}
