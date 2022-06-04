import { defineConfig, UserConfig, UserConfigFn } from 'vite'
import SolidJS from 'vite-plugin-solid'
import pluginTSConfigPaths from 'vite-tsconfig-paths'
import pluginCompression from 'vite-plugin-compression'
import SolidSVG from 'vite-plugin-solid-svg'
// import ssr from 'vite-plugin-ssr/plugin'
import manifest from './public/manifest.json'
import mdx from '@mdx-js/rollup'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

const pwaEnabled = false
const pwaOptions = {
  registerType: 'autoUpdate',
  // Warning: don't add sitemap.xml yet:
  // - Should check if we can include it or not
  // - If you ping crawlers it should not be on sw precache
  // - Review images to include from public/img subdirectories: bios and blog
  includeAssets: ['robots.txt', 'og.png', 'icons/*.svg', 'fonts/*.{eot,woff,woff2}', '*.{png,ico,svg,jpg}'],
  manifest,
  workbox: {
    // Warning: DON'T add sw.js and workbox-xxxx.js
    globPatterns: ['*.html', 'manifest.json', '*.{svg,png,jpg,woff,eot,ttf}'],
    // We need to increase the workbox size, all assets with size > 2MIB will
    // be excluded and then will not work on offline when used
    maximumFileSizeToCacheInBytes: 5000000,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/unpkg\.com\/\//i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'unpkg-com',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      },
      {
        urlPattern: /^https:\/\/cdn\.skypack\.dev\//i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'cdn-skypack-dev',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200]
          }
        }
      }
    ]
  }
}
const dev = process.env.NODE_ENV !== 'production'
const isSSR = process.argv.includes('ssr')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx'
      }),
      enforce: 'pre'
    },
    SolidJS({ extensions: ['.md', '.mdx'], dev }),
    pluginTSConfigPaths(),
    pluginCompression({ algorithm: 'brotliCompress' }),
    SolidSVG(),
    pwaEnabled && VitePWA(pwaOptions as any)
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/fonts";\n@import "src/styles/imports";\n`
      }
    }
  },
  optimizeDeps: {
    include: [],
    exclude: []
  },
  build: {
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    polyfillDynamicImport: false,
    target: 'esnext',
    rollupOptions: isSSR ? { input: './src/ssr.ts' } : {}
  },
  resolve: {
    alias: {
      $: path.resolve(__dirname, './src')
    }
  }
} as UserConfig) as UserConfigFn
