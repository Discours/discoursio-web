import { client } from '../../lib/client'
import { token, session } from '../../stores/user'
import { GET_ME } from '../../lib/queries'
import { setCookie } from '../../lib/cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
	const { token: got } = params
	if(got) {
		token.set(got)
		const user = await client.request(GET_ME)
		session.set(user)
		setCookie('token', got, 420)
		window.close()
	} else {
		return 'No token was provided'
	}
}