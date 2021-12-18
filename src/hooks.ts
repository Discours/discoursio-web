import Cookie from 'js-cookie'

export async function handle({ request, resolve, redirect }) {
	try { request.locals.cookies = Cookie.get() }
	catch(e) { request.locals.cookies = {} }
	const subdomain = request.host && request.host.split('.')[0]
	if (subdomain != 'discours') request.locals.subdomain = subdomain
	const response = await resolve(request)
	return response
}
