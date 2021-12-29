
/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, locals }) {
	const { slug, what } = body
	let { subscriptions: subs } = locals || { subscriptions: {} }
    // console.debug(subs)
	if (!subs[what]) subs[what] = []
	subs[what].push(slug)
	const headers = {
        'Set-Cookie': what + '=' + JSON.stringify(Array.from(new Set(subs[what])))
    }
	return { headers, body: { ok: true } }
}
