import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import { typescript } from 'svelte-preprocess-esbuild'
// import { mdsvex } from 'mdsvex'
// import { windi as windiSvelte } from 'svelte-windicss-preprocess'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssg from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle } = require('svelte-preprocess')
// const { default: windiVite } = require('vite-plugin-windicss')

require('dotenv').config()

const ignoreWarns = [
	'a11y-distracting-elements',
	'a11y-missing-attribute',
	'css-unused-selector'
]

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))

const scssOptions = {
	// https://github.com/sveltejs/svelte-preprocess/blob/main/docs/getting-started.md#31-prepending-content
	prependData: `@import 'src/styles/_imports.scss';`,
	renderSync: true, // renderSync is faster for Dart Sass which
	outputStyle: 'expanded' // Dart Sass recognizes 'expanded' and 'compressed'
}

// TODO: graphql queries for prerender

let articles = {} // require('./src/data/articles.json')
let topics = {} // require('./src/data/topics.json')
let communities = {
	discours: {
		slug: 'discours',
		title: 'Дискурс',
		pic: 'https://discours.io/images/logo.svg'
	}
}
let authors = {} // require('./src/data/authors.json')

/** @type {import('@sveltejs/kit').Config} */
const config = {
	logger: console,
	preprocess: [
		typescript(),
		scss(scssOptions, { name: 'scss' }),
		// windiSvelte({}),
		// postcss(postcssConfig, { name: 'postcss' }),
		globalStyle()
		// mdsvex(),
	],
	prerender: {
		entries: [
			'/',
			'/create',
			'/feed',
			'/topics',
			'/search',
			...Object.keys(articles).reduce((_pv, cv, _ci, _all) => '/' + cv, ''),
			...Object.keys(topics).reduce((_pv, cv, _ci, _all) => '/' + cv, ''),
			...Object.keys(communities).reduce((_pv, cv, _ci, _all) => '/@' + cv, ''),
			...Object.keys(authors).reduce((_pv, cv, _ci, _all) => '/@' + cv, '')
		]
	},
	compilerOptions: {
		enableSourcemap: true,
		cssHash: ({ hash, css }) => 's' + hash(css)
	},
	onwarn: (w, cb) =>
		ignoreWarns.indexOf(w.code) == -1 && !console.log(w.code) && cb(w),
	kit: {
		adapter: process.env.VERCEL ? vercel() : node(),
		target: '#svelte',
		vite: {
			// plugins: [windiVite({})],
			ssr: {
				external: ['w3c-keyname'],
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	},
	skipIntroByDefault: true,
	experimental: {
		prebundleSvelteLibraries: true
	}
}

export default config
