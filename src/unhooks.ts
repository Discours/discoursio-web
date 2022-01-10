import { token } from "./stores/user"

const subnames = ['topics', 'authors']

export async function handle({ request, resolve }) {
	const cookies: { [key: string]: string } = {}
	const rhc = request.headers && request.headers.cookie
	if (rhc) rhc.split('=').forEach((c) => (cookies[c[0]] = c[1].split(';')[0]))
	subnames.forEach(async (s) => {
		if(cookies[s]) cookies[s] = await JSON.parse(cookies[s] || '')
	})
	let subdomain = request.host && request.host.split('.')[0]
	if (subdomain === 'discours' || subdomain === 'new') subdomain = ''
	token.set(cookies['token'])
	request.locals = { subdomain }
	if(Object.keys(cookies).length > 0) {
		console.debug(cookies)
		request.session = cookies
	}
	const response = await resolve(request)
	return response
}