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
const scssOptions = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
  prependData: `@import 'src/styles/_imports.scss';`,
  // Docs say renderSync is faster for Dart Sass which I am using
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
  renderSync: true,
  // Dart Sass recognizes 'expanded' and 'compressed'
  outputStyle: 'expanded',
}
const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))
let adapter = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  adapt: async () => await node(),
}
adapter = process.env.VERCEL ? vercel() : (process.env.SSR ? ssr() : adapter)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  adapter,
  preprocess: [
    globalStyle(),
    mdsvex(),
    typescript(),
    scss(scssOptions, { name: 'scss' }),
  ],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  compilerOptions: { cssHash: ({ hash, css }) => hash(css) },
  kit: {
    vite: {
      optimizeDeps: {
        include: ['yjs', 'y-indexeddb'],
        exclude: ['y-webrtc'],
      },
      esbuildOptions: {
        external: [],
      },
      ssr: {
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
  ssr: process.env.SSR === 1,
  skipIntroByDefault: true,
  target: '#svelte'
}

export default config
