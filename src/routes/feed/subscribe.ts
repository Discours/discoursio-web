/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, locals }) {
	const { slug, what } = body
	const { cookies } = locals
	// console.debug(subs)
	if (!cookies[what]) cookies[what] = []
	cookies[what].push(slug)
	const headers = {
		'Set-Cookie': what + '=' + JSON.stringify(Array.from(new Set(cookies[what])))
	}
	return { headers, body: { ok: true } }
}
