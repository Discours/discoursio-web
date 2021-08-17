/* eslint-disable @typescript-eslint/no-unused-vars */
import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import derverPkg from 'derver'
import svelteCfg from './svelte.config.cjs'
import precompile from './precompiler.js'
import fs from 'fs'

const { preprocess } = svelteCfg
const { derver } = derverPkg
const dev = process.env.NODE_ENV == 'development'
const port = 5000
const dir = 'public'

const compileOptions = { dev, css: false }

const options = {
  logLevel: 'warning',
  entryPoints: [`src/index.ts`],
  external: ['react'],
  bundle: true,
  color: true,
  incremental: dev,
  outfile: dir + `/bundle.js`,
  plugins: [ 
    svelte({ compileOptions, preprocess })
  ]
}

if(!dev) {
  options.minify = true
  options.treeShaking = true
}

console.log('build: making...')
build(options)
  .then(builder => {
    console.log('build: finished')
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
              await precompile()
            } catch(err) { lr.error(err.message, 'build: content precompiler error')}
          }
        }
      })
      console.log('build: serving for development')
    } else {
      console.log('build: production is ready')
      process.exit(0)
    }
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

