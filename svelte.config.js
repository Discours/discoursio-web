import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
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

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))

const scssOptions = {
	// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
	prependData: `@import 'src/styles/_imports.scss';`,
	renderSync: true, // renderSync is faster for Dart Sass which
	outputStyle: 'expanded' // Dart Sass recognizes 'expanded' and 'compressed'
}

// TODO: graphql queries for prerender

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
		prerender: {
			enabled: false // FIXME
		},
		vite: {
			build: {
			  chunkSizeWarningLimit: 777
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
