import { defineConfig, UserConfigExport } from 'vite'
import solid from 'solid-start'
import vercel from 'solid-start-vercel'
import node from 'solid-start-node'

const adapter = process.env.VERCEL ? vercel() : node()
const cnf: UserConfigExport = {
  plugins: [
    /*{
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      ...(await import("@mdx-js/rollup")).default({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx"
      }),
      enforce: "pre"
    },*/
    solid({
      adapter,
      ssr: false,
      // extensions: [".mdx", ".md"]
    })],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/styles/fonts";\n@import "~/styles/imports";\n`
      }
    }
  }
}

export default defineConfig(cnf)
