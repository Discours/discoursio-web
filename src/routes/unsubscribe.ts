/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, locals }) {
	const { slug, what } = body
	// console.log('unsubscribe: ' + slug + ' of ' + what)
	let { subscriptions: subs } = locals || { subscriptions: {} }
	if (subs[what]) {
		let sss = new Set(subs[what])
		sss.delete(slug)
		const headers = {
			'Set-Cookie': what + '=' + JSON.stringify(Array.from(sss))
		}
		// console.log('setting cookie: '  + JSON.stringify(Array.from(sss)))
		return { headers, body: { ok: true } }
	}
	return { body: { ok: true } }
}