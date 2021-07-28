/* eslint-disable @typescript-eslint/no-unused-vars */
import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import derverPkg from 'derver'
import svelteCfg from './svelte.config.cjs'
import precompile from './precompiler.js'

const { preprocess } = svelteCfg
const { derver } = derverPkg
const dev = process.env.NODE_ENV == 'development'
const port = 5000
const dir = 'public'

const compileOptions = process.env.SSR==='ssr' ? {
  dev, 
  hydratable: true,
  immutable: true,
  generate: 'ssr'
} : {
  dev,
  css: false
}

const options = {
  entryPoints: [`src/index${process.env.SSR==='ssr'?'.ssr':''}.ts`],
  bundle: true,
  color: true,
  incremental: dev,
  outfile: dir + `/bundle${process.env.SSR==='ssr'?'.ssr':''}.js`,
  plugins: [ 
    svelte({ compileOptions, preprocess })
  ]
}

if(!dev) {
  options.minify = true
  options.treeShaking = true
}

const make = (callback = null) => {
  build(options)
  .then(builder => {
    if (builder.warnings && builder.warnings.length) {
      builder.warnings.forEach(w => console.warn(w))
      return
    }
    if(dev) {
      derver({
        dir, 
        port,
        watch: [ dir, 'src', 'content' ],
        onwatch: async (lr, item) => {
          if (item == 'src') {
            lr.prevent()
            try {
                await builder.rebuild()
            } catch(err) {
                lr.error(err.message,'Svelte compile error')
            }
          }
          if (item == 'content') {
            lr.prevent()
            try {
              // await precompile()
            } catch(err) { lr.error(err.message, 'esbuild: content precompiler error')}
          }
        }
      })
    } else {
      console.log('esbuild: successfully built for production')
      process.exit(0)
    }
    if (callback) callback()
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

if(process.env.SSR) { 
  make()
  console.log('esbuild: precompiling with SSR')
  precompile()
}
else {
  make()
}
