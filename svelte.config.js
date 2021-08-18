import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import sveltePre from 'svelte-preprocess'
import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
import vercel from '@sveltejs/adapter-vercel'

const { scss, globalStyle } = sveltePre
const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [mdsvex(), typescript(), scss(), globalStyle()],

  kit: {
    adapter: vercel(),
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
