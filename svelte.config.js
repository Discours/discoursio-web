import { readdirSync, readFileSync, statSync } from 'fs'
import { typescript } from 'svelte-preprocess-esbuild'
import { mdsvex } from 'mdsvex'
import adapter from '@sveltejs/adapter-auto'
//import vercel from '@sveltejs/adapter-vercel'
//import node from '@sveltejs/adapter-node'
//import ssg from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle } = require('svelte-preprocess')

const routesDir = './src/routes'
const p = (f) => new URL(f, import.meta.url)
const onlyDir = (f) => statSync(p(routesDir + '/' + f)).isDirectory()
const routes = JSON.stringify(readdirSync(p(routesDir)).filter(onlyDir))
process.stdout.moveCursor(0, -1) // up one line
console.log('subroutes: ' + routes)

const pkg = JSON.parse(readFileSync(p('package.json'), 'utf8'))

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
		globalStyle(),
		mdsvex()
	],
	compilerOptions: {
		enableSourcemap: true,
		cssHash: ({ hash, css }) => 's' + hash(css)
	},
	replace: [
		[
			'process.env.VITE_ROUTES',
			routes
		]
	],
	kit: {
		adapter: adapter(), // process.env.VERCEL ? vercel() : process.env.SSG ? ssg() : node(),
		target: '#svelte',
		hydrate: true,
		ssr: true,
		prerender: { enabled: true },
		vite: {
			build: {
				chunkSizeWarningLimit: 777,
				rollupOptions: {
					output: {
						manualChunks: undefined
					}
				}
			},
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
