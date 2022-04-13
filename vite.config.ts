import { defineConfig } from 'vite'
import SolidJS from 'vite-plugin-solid'
import SolidSVG from 'vite-plugin-solid-svg'
import manifest from './src/assets/manifest.json'
import mdx from '@mdx-js/rollup'
import { VitePWA } from 'vite-plugin-pwa'

const pwaOptions = {
  registerType: 'autoUpdate',
  // Warning: don't add sitemap.xml yet:
  // - Should check if we can include it or not
  // - If you ping crawlers it should not be on sw precache
  // - Review images to include from public/img subdirectories: bios and blog
  includeAssets: [
    'robots.txt',
    'og.png',
    'img/icons/*.svg',
    'img/favicons/*.{png,ico}',
    'examples/*.json',
    'img/logo.png',
    'img/logo/*/logo.*'
  ],
  manifest,
  workbox: {
    // Warning: DON'T add sw.js and workbox-xxxx.js
    globPatterns: ['*.html', 'manifest.webmanifest', 'assets/*', '*.{svg,png,jpg,woff,eot,ttf}'],
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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: 'solid-js',
        providerImportSource: 'solid-mdx'
        // remarkPlugins: [remarkGfm],
      }),
      enforce: 'pre'
    },
    SolidJS({ extensions: ['.md', '.mdx'] }),
    SolidSVG(),
    false && VitePWA(pwaOptions as any)
  ],
  optimizeDeps: {
    include: [],
    exclude: []
  },
  build: {
    polyfillDynamicImport: false,
    target: 'esnext'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/fonts";\n@import "src/styles/imports";\n`
      }
    }
  }
})
