import cookie from 'cookie'

export async function handle({ request, resolve, redirect }) {
	request.locals.cookies = await cookie.parse(request.headers.cookie || '')
	const subdomain = request.host && request.host.split('.')[0]
	if (subdomain != 'discours') request.locals.subdomain = subdomain
	const response = await resolve(request)
	return response
}
