import cookie from 'cookie'

export async function handle({ request, resolve }) {
	const cookies = cookie.parse(request.headers.cookie || '')
	// code here happends before the endpoint or page is called
	const response = await resolve(request)
	// code here happens after the endpoint or page is called
	return response
}
