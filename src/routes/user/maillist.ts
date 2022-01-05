/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { email } = params
	const r = await fetch('/api/maillist', {
		method: 'post',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json; charset=utf-8'
		},
		body: await JSON.stringify({ email })
	})
	return {
		headers: {
			'set-cookie': 'maillist=' + email + ';'
		},
		body: { ok: r.ok }
	}
}
