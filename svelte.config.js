/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
// import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
// import { windi as windiSvelte } from 'svelte-windicss-preprocess'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssr from '@sveltejs/adapter-static'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { scss, typescript, /* postcss, */ globalStyle } = require('svelte-preprocess')
const { default: windiVite } = require('vite-plugin-windicss')

const ignoreWarns = [
  'a11y-distracting-elements',
  'a11y-missing-attribute',
  'css-unused-selector',
]

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))
const nodeAdapter = { adapt: async () => await node() }
const adapter = process.env.VERCEL
  ? vercel()
  : process.env.SSR
  ? ssr()
  : nodeAdapter

const scssOptions = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
  prependData: `@import 'src/styles/_imports.scss';`,
  renderSync: true, // renderSync is faster for Dart Sass which
  outputStyle: 'expanded', // Dart Sass recognizes 'expanded' and 'compressed'
}



/** @type {import('@sveltejs/kit').Config} */
const config = {
  adapter,
  logger: console,
  preprocess: [
    scss(scssOptions, { name: 'scss' }),
    // windiSvelte({}),
    // postcss(postcssConfig, { name: 'postcss' }),
    globalStyle(),
    mdsvex(),
    typescript(),
  ],
  compilerOptions: { cssHash: ({ hash, css }) => hash(css) },
  onwarn: (w, cb) =>
    ignoreWarns.indexOf(w.code) == -1 && !console.log(w.code) && cb(w),
  kit: {
    vite: {
      plugins: [windiVite({})],
      optimizeDeps: {
        include: ['yjs', 'y-indexeddb', 'y-webrtc'],
      },
      ssr: {
        external: ['w3c-keyname'],
        noExternal: Object.keys(pkg.dependencies || {}),
      },
    },
  },
  skipIntroByDefault: true,
  target: '#svelte',
}

export default config
