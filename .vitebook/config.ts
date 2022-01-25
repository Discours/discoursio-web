import { defineConfig, clientPlugin } from '@vitebook/client/node'
import {
  DefaultThemeConfig,
  defaultThemePlugin
} from '@vitebook/theme-default/node'
import { svelteMarkdownPlugin } from '@vitebook/markdown-svelte/node'
import { shikiMarkdownPlugin } from '@vitebook/markdown-shiki/node'

export default defineConfig<DefaultThemeConfig>({
  include: ['src/book/*.md'],
  vite: {
    optimizeDeps: {
      include: ['clsx']
    }
  },
  plugins: [
    svelteMarkdownPlugin({
      code: {
        lineNumbers: false,
      },
    }),
    shikiMarkdownPlugin(),
    clientPlugin({
      appFile: 'App.svelte',
      include: /\.svelte/,
      svelte: {
        extensions: ['.svelte', '.md'],
        experimental: {
          // Remove if using `svelte-preprocess`.
          useVitePreprocess: true
        }
      },
    }),
    defaultThemePlugin()
  ],
  site: {
    title: 'discours.ui UI playbook',
    description: 'Try our components',
    theme: {
      remoteGitRepo: {
        url: 'Discours/discoursio-web'
      }
    }
  }
})
