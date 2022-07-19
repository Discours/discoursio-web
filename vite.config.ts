import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
// import legacy from '@vitejs/plugin-legacy'
import tsconfigPaths from 'vite-tsconfig-paths'
import solid from 'vite-plugin-solid'
import mdx from '@mdx-js/rollup'
import path from 'path'
import pwaOptions from './vite.pwa.config'

const dev = process.env.NODE_ENV !== 'production'
// const ssr = process.argv.includes('ssr')
const pwaEnabled = process.argv.includes('pwa')

export default defineConfig({
  plugins: [
    { 
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx',
      }),
      enforce: 'pre'
    } as any,
    solid({ extensions: ['.md', '.mdx'], dev }),
    tsconfigPaths(),
    // legacy({  targets: ['defaults', 'not IE 11'] }),
    pwaEnabled && VitePWA(pwaOptions)
  ],
  css: {
    preprocessorOptions: {
      scss: { additionalData: "@import \"src/styles/imports\";\n" }
    }
  },
  optimizeDeps: {
    disabled: false,
    include: [],
    exclude: []
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 777,
    cssCodeSplit: true,
    target: 'esnext',
    commonjsOptions: { include: [] },
    rollupOptions: { external: ['solid-social'] }
  },
  resolve: {
    alias: { $: path.resolve(__dirname, './src') },
    dedupe: ['solid-js', 'solid-mdx'],
    conditions: ['development', 'browser']
  }
})
