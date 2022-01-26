import { defineConfig, clientPlugin } from '@vitebook/client/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'
import config from '../svelte.config'
import path from 'path'

const scssOptions = {
  // https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
  prependData: `@import 'src/styles/_imports.scss';`,
  renderSync: true, // renderSync is faster for Dart Sass which
  outputStyle: 'expanded' // Dart Sass recognizes 'expanded' and 'compressed'
}

export default defineConfig({
  include: ['src/**/*.md', 'src/**/*.story.svelte'],
  alias: {
    '$lib': path.resolve(__dirname, '../../src/lib'),
    '$app': path.resolve(__dirname, '../../.svelte-kit/runtime/app')
  },
  plugins: [
    svelteMarkdownPlugin(),
    shikiMarkdownPlugin(),
    clientPlugin({
      appFile: 'App.svelte',
      svelte: {
        extensions: ['.svelte', '.md'],
        preprocess: config.preprocess
      }
    })
  ]
})