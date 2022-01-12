import { createCookie } from '$lib/cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, locals }) {
	const { slug, what } = body
	// console.log('unsubscribe: ' + slug + ' of ' + what)
	const { cookies } = locals
	if (cookies[what]) {
		const sss = new Set(cookies[what])
		sss.delete(slug)
		const headers = {
			'Set-Cookie': createCookie(what, Array.from(sss))
		}
		// console.log('setting cookie: '  + JSON.stringify(Array.from(sss)))
		return { headers, body: { ok: true } }
	}
	return { body: { ok: true } }
}
