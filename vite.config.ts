import { defineConfig, UserConfigExport } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    emptyOutDir: false,
    target: 'esnext',
    polyfillDynamicImport: false,
    outDir: 'public'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/fonts";\n@import "src/styles/imports";\n`
      }
    }
  },
  test: {
    exclude: ['./e2e/**/*.spec.js', 'node_modules'],
    environment: 'jsdom'
  }
} as UserConfigExport)
