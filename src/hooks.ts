import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { parse } = require('cookie')

export async function handle({ request, resolve }) {
	const cookies = parse(request.headers.cookie || '')
	const subscriptions = {}
	Object.entries(cookies).forEach(async ([what, value]) => {
		if (value) subscriptions[what] = await JSON.parse(String(value))
	})
	let subdomain = request.host && request.host.split('.')[0]
	if (subdomain == 'discours') subdomain = ''
	request.session = { subdomain, subscriptions }
	return await resolve(request)
}
