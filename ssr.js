/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fileURLToPath } from 'url'
import { tossr } from 'tossr'
import { resolve, join, sep } from 'path'
import fs from 'fs'
import { createRequire } from 'module'
import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import svelteCfg from './svelte.config.cjs'

const { preprocess } = svelteCfg

const require = createRequire(import.meta.url)

const lang = 'ru'
// const org = 'discours.io'
const shouts = require('.' + sep +'public' + sep + 'shouts'+(lang==='ru'?'':'.'+lang)+'.json')
const cwd = resolve('.')
const publicPath = resolve(cwd, 'public')
const srcPath = resolve(cwd, 'src')
const indexPath = resolve(srcPath, 'index.html')
const bundlePath = resolve(publicPath, 'bundle.ssr.js')
let indexContent = fs.readFileSync(indexPath).toString()

const options = {
  logLevel: 'warning',
  entryPoints: [resolve(`src`, `index.ts`), ],
  external: ['react'],
  bundle: true,
  color: true,
  incremental: false,
  outfile: bundlePath,
  plugins: [ 
    svelte({ compileOptions: { css: false, generate: 'ssr' }, preprocess })
  ]
}

const make = () => {
  console.log('ssr: building...')
  build(options)
    .then(builder => {
      console.log('ssr: build finished')
      if (builder.warnings && builder.warnings.length) {
        builder.warnings.forEach(w => console.warn(w))
        return
      }
      console.log('ssr: bundle is ready')
      process.exit(0)
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}



// require('svelte/register') // FIXME: cannot use import inside anyway
// console.log('prerender: svelte compiler is registered')
// const App = require('./src/App.svelte')

const routes = [
  //'/',            // index.html
  //'/a/:shout',    // /a/<shout-slug>/index.html 
  sep + 'login',
  sep + 'resetpassword',
  sep + 'create',
  sep + 'search',
  sep + 'forum'
]

const renderShout = async (skey) => {
    // console.log('ssr: /a/' + skey)
    const apath = skey === '' ? publicPath : join(publicPath, sep + 'a' + sep + skey)
    const shout = shouts[skey]
    const html = await tossr(
        indexContent
        .replace('lang="en">', `lang="${lang}">`)
        .replace('<title>discours.io', `<title>Дискурс${(shout && shout.title)?(' : ' +shout.title):''}`)
        .replace('</head>', `\t<script>window.SHOUT = ${JSON.stringify(shout)}</script>\n\t</head>`),
        bundlePath,
        sep + 'a' + sep + skey
    )
    fs.mkdir(apath, {recursive: true}, () => fs.writeFileSync(join(apath, 'index.html'), html))
}

const render = async (skey) => {
  if(skey === null) return
  const html = await tossr(indexContent, bundlePath, skey)
  const pt = join(publicPath, skey)
  fs.mkdir(pt, {recursive: true}, (err) => {
    //console.log('render: ' + skey)
    if(err) console.error(err)
    return fs.writeFileSync(pt + sep + 'index.html', html)
  })
}

export const ssr = () => {
  make()
  if(fs.existsSync(bundlePath)) {
    routes.forEach((sroute) => render(sroute))
    Object.keys(shouts).forEach((sroute) => renderShout(sroute))
  } else console.log('ssr: sorry, no bundle yet')
}

process && process.argv[1] === fileURLToPath(import.meta.url) && ssr()