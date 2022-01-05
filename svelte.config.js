
import { readFileSync } from 'fs'
import { typescript } from 'svelte-preprocess-esbuild'
// import { mdsvex } from 'mdsvex'
// import { windi as windiSvelte } from 'svelte-windicss-preprocess'
// import adapter from '@sveltejs/adapter-auto'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssg from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle } = require('svelte-preprocess')
// const { default: windiVite } = require('vite-plugin-windicss')

const pkg = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8'))

const scssOptions = {
	// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
	prependData: `@import 'src/styles/_imports.scss';`,
	renderSync: true, // renderSync is faster for Dart Sass which
	outputStyle: 'expanded' // Dart Sass recognizes 'expanded' and 'compressed'
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		typescript(),
		scss(scssOptions, { name: 'scss' }),
		// windiSvelte({}),
		// postcss(postcssConfig, { name: 'postcss' }),
		globalStyle()
		// mdsvex(),
	],
	compilerOptions: {
		enableSourcemap: true,
		cssHash: ({ hash, css }) => 's' + hash(css)
	},
	kit: {
		adapter: process.env.VERCEL ? vercel() : process.env.SSG ? ssg() : node(),
		target: '#svelte',
		hydrate: true,
		ssr: true,
		prerender: {
			enabled: true
			// FIXME: https://github.com/Discours/discoursio-web/issues/30
		},
		vite: {
			build: {
				chunkSizeWarningLimit: 777,
				rollupOptions: {
					output: {
						manualChunks: undefined
					}
				}
			},
			// plugins: [windiVite({})],
			ssr: {
				external: ['w3c-keyname'],
				noExternal: Object.keys(pkg.dependencies || {})
			},
			external: ['w3c-keyname']
		}
	},
	skipIntroByDefault: true,
	experimental: {
		prebundleSvelteLibraries: true
	}
}

export default config
