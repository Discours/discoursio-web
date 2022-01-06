import { client } from '$lib/client'
import { token, session } from '../../stores/user'
import { GET_ME } from '$lib/queries'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { token: got } = params
	if (got) {
		token.set(got)
		const user = await client.request(GET_ME)
		session.set(user)
		window.close()
		return {
			headers: { 'Set-Cookie': 'token=' + got + '; path=/' },
			body: { ok: true }
		}
	} else {
		return {
			body: {
				error: 'No token was provided'
			}
		}
	}
}
