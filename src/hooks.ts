import { minify } from 'html-minifier'
import { prerendering } from '$app/env'

const subnames = ['topics', 'authors']
const minification_options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	conservativeCollapse: true,
	decodeEntities: true,
	html5: true,
	ignoreCustomComments: [/^#/],
	minifyCSS: true,
	minifyJS: false,
	removeAttributeQuotes: true,
	removeComments: true,
	removeOptionalTags: true,
	removeRedundantAttributes: true,
	removeScriptTypeAttributes: true,
	removeStyleLinkTypeAttributes: true,
	sortAttributes: true,
	sortClassName: true
}

export async function handle({ request, resolve }) {
	const cookies: { [key: string]: string } = {}
	const rhc = request.headers && request.headers.cookie
	if(rhc) rhc.split('=').forEach((c) => (cookies[c[0]] = c[1].split(';')[0]))
	const subscriptions = {}
	Object.entries(cookies).forEach(async ([what, value]) => {
		if (value in subnames) subscriptions[what] = await JSON.parse(String(value))
	})
	let subdomain = request.host && request.host.split('.')[0]
	if (subdomain == 'discours') subdomain = ''
	request.session = { subdomain, subscriptions }
	const response = await resolve(request)
	if (prerendering && response.headers['content-type'] === 'text/html') {
		response.body = minify(response.body, minification_options);
	  }
	return response
}