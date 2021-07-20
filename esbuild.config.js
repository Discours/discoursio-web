/* eslint-disable @typescript-eslint/no-unused-vars */
import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import derverPkg from 'derver'
import svelteCfg from './svelte.config.cjs'
import prerender from './prerender.js'
import precompile from './precompiler.js'

const { preprocess } = svelteCfg
const { derver } = derverPkg
const dev = process.env.NODE_ENV == 'development'
const port = 5000
const dir = 'public'

export const routes = [
  '/', // home
  '/login', // auth
  '/create', // edit
  //'/o/:org', // TODO: redirect to /a/index.html
  //'/p/:project', // TODO: redirect to /a/<project>/index.html
  '/a/:shout',  // /a/<shout>/index.html
  '/a/:project/:shout', // /a/<project>/<shout>/index.html
  '/search',
  '/forum'
]


const pluginPrerender = prerender( {
  staticDir: dir,
  routes,
  puppeteer: {}
} )

const options = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  color: true,
  incremental: dev,
  outfile: dir + '/bundle.js',
  plugins: [ 
    svelte({
      compileOptions: { dev, css: false }, 
      preprocess 
    }),
    // TODO: esbuild-plugin prerender 
  ]
}

if(!dev) {
  options.minify = true
  options.treeShaking = true
}

precompile()

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
              await precompile()
            } catch(err) { lr.error(err.message, 'Content precompiler error')}
          }
        }
      })
    } else {
      console.log('esbuild: successfully built for production')
      process.exit(0)
    }
  }).catch((err) => {
    console.error(err)
    process.exit(1)
  })