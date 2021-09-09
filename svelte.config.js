/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssr from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle } = require('svelte-preprocess')

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))
const preprocess = [
  globalStyle(),
  mdsvex(),
  typescript(),
  scss({
    // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
    prependData: `@import 'src/styles/_imports.scss';`,
    // Docs say renderSync is faster for Dart Sass which I am using
    // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
    renderSync: true,
    // Dart Sass recognizes 'expanded' and 'compressed'
    outputStyle: 'expanded',
  }),
]
const adapter = process.env.VERCEL ? vercel() : (process.env.SSR ? ssr() : {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  adapt: async () => await node()
})

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  compilerOptions: { cssHash: ({ hash, css }) => hash(css) },
  kit: {
    adapter,
    ssr: process.env.SSR === 1,
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      optimizeDeps: {
        include: ['yjs', 'y-indexeddb', 'y-webrtc'],
        exclude: [],
      },
      esbuildOptions: {
        external: [],
      },
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
}

export default config
