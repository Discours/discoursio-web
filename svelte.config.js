import { writeFileSync, readdirSync, readFileSync, statSync } from 'fs'
// import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-auto'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssg from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle, typescript } = require('svelte-preprocess')

const routesDir = './src/routes'
const p = (f) => new URL(f, import.meta.url)
const onlyDir = (f) =>
  statSync(p(routesDir + '/' + f)).isDirectory() && f !== '[slug]'

writeFileSync(
  p(routesDir + '/[slug]/routes.json'),
  JSON.stringify(readdirSync(p(routesDir)).filter(onlyDir), null, 2)
)

const pkg = JSON.parse(readFileSync(p('package.json'), 'utf8'))

const scssOptions = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
  prependData: `@import 'src/styles/_imports.scss';`,
  renderSync: true, // renderSync is faster for Dart Sass which
  outputStyle: 'expanded' // Dart Sass recognizes 'expanded' and 'compressed'
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    typescript(),
    scss(scssOptions, { name: 'scss' }),
    globalStyle(),
    mdsvex()
  ],
  compilerOptions: {
    dev: process.env.NODE_ENV === 'development',
    enableSourcemap: true,
    cssHash: ({ hash, css }) => 's' + hash(css)
  },
  kit: {
    adapter: node(), // process.env.VERCEL ? vercel() : process.env.SSG ? ssg() : node(),
    target: '#svelte',
    hydrate: true,
    prerender: {
      concurrency: 9,
      enabled: false,
      entries: ['*']
    },
    vite: {
      build: {
        chunkSizeWarningLimit: 777,
        rollupOptions: {
          output: {
            manualChunks: undefined
          }
        }
      },
      ssr: {
        external: ['w3c-keyname'],
        noExternal: Object.keys(pkg.dependencies || {})
      },
      external: ['w3c-keyname']
    }
  },
  skipIntroByDefault: true,
  experimental: {
    prebundleSvelteLibraries: true
  }
}

export default config
