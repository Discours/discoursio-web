import { clientPlugin, defineConfig } from '@vitebook/client/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import config from '../svelte.config'

export default defineConfig({
  include: ['src/book/**/*.{md,svelte}'],
  plugins: [
    shikiMarkdownPlugin(),
    svelteMarkdownPlugin(),
    clientPlugin({
      appFile: 'App.svelte',
      svelte: {
        extensions: ['.svelte', '.md'],
        preprocess: config.preprocess
      },
    })
  ],
  site: {
    title: 'discoursio-book',
    description: '',
    theme: {},
  },
});
