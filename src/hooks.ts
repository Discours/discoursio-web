import { token } from './stores/user'

export async function handle({ request, resolve }) {
	const cookies: { [key: string]: string } = {}
	const rhc = request.headers && request.headers.cookie
	if (rhc) rhc.split('=').forEach((c) => (cookies[c[0]] = c[1].split(';')[0]))
	// let subdomain = request.host && request.host.split('.')[0]
	// if (subdomain === 'discours' || subdomain === 'new') subdomain = ''
	cookies['token'] ?? token.set(cookies['token'])
	const response = await resolve(request)
	return response
}
