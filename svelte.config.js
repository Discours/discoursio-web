import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import { scss, globalStyle } from 'svelte-preprocess'
import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
import vercel from '@sveltejs/adapter-vercel'

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    globalStyle(),
    mdsvex(),
    typescript(),
    scss({
      // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
      prependData: `@import 'src/styles/_variables.scss';`,
      // Docs say renderSync is faster for Dart Sass which I am using
      // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/preprocessing.md#scss-sass
      renderSync: true,
      // Dart Sass recognizes 'expanded' and 'compressed'
      outputStyle: 'expanded',
    }),
  ],
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  compilerOptions: { cssHash: ({ hash, css }) => hash(css) },
  kit: {
    adapter: vercel(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      build: {
        cssCodeSplit: false,
      },
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
