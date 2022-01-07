const subnames = ['topics', 'authors']

export async function handle({ request, resolve }) {
	const cookies: { [key: string]: string } = {}
	const rhc = request.headers && request.headers.cookie
	if (rhc) rhc.split('=').forEach((c) => (cookies[c[0]] = c[1].split(';')[0]))
	const subscriptions = {}
	Object.entries(cookies).forEach(async ([what, value]) => {
		if (value in subnames) subscriptions[what] = await JSON.parse(String(value))
	})
	let subdomain = request.host && request.host.split('.')[0]
	if (subdomain == 'discours') subdomain = ''
	request.session = { subdomain, subscriptions }
	const response = await resolve(request)
	return response
}
