import { defineConfig, clientPlugin } from '@vitebook/client/node'
import {
  DefaultThemeConfig,
  defaultThemePlugin
} from '@vitebook/theme-default/node'

export default defineConfig<DefaultThemeConfig>({
  include: ['src/**/*.story.svelte'],
  vite: {
    optimizeDeps: {
      include: ['clsx']
    }
  },
  plugins: [
    clientPlugin({
      appFile: 'App.svelte',
      svelte: {
        experimental: {
          // Remove if using `svelte-preprocess`.
          useVitePreprocess: true
        }
      }
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
