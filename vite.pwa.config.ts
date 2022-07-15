import { VitePWAOptions } from 'vite-plugin-pwa'
import manifest from './public/manifest.json'
export default {
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
} as unknown as VitePWAOptions
