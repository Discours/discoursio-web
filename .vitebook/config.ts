import { defineConfig, clientPlugin } from '@vitebook/client/node'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defaultThemePlugin, DefaultThemeConfig } from '@vitebook/theme-default/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'
import { bundleRequire } from 'bundle-require'
import config from '../svelte.config'
import path from 'path'

export default defineConfig({
  include: ['./src/book/**/*.md', './src/book/**/*.story.svelte'],
  alias: {
    '$lib': path.resolve(__dirname, '../../src/lib'),
    '$app': path.resolve(__dirname, '../../.svelte-kit/runtime/app')
  },
  plugins: [
    svelteMarkdownPlugin(),
    shikiMarkdownPlugin(),
    clientPlugin({ appFile: 'App.svelte' }),
    svelte({
      extensions: ['.svelte', '.md'],
      // Consult https://github.com/sveltejs/svelte-preprocess for more information
      // about preprocessors.
      preprocess: config.preprocess,
    }),
    defaultThemePlugin()
  ],
  vite: { build: { chunkSizeWarningLimit: 777 } }
})