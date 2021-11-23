import cookie from 'cookie'

export async function handle({ request, resolve, redirect }) {
	request.locals.cookies = await cookie.parse(request.headers.cookie || '')
	const response = await resolve(request)
	return response
}
