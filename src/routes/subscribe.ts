/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, session }) {
	const { slug, what } = body
	const { subscriptions: subs } = session || { subscriptions: {} }
	// console.debug(subs)
	if (!subs[what]) subs[what] = []
	subs[what].push(slug)
	const headers = {
		'Set-Cookie': what + '=' + JSON.stringify(Array.from(new Set(subs[what])))
	}
	return { headers, body: { ok: true } }
}
