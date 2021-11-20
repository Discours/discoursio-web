import { client } from '../lib/client'
import { token, session } from '../stores/user'
import { GET_ME } from '../lib/queries'

export async function get(req) {
	const got = req.query.get('token')
	token.set(got)
	const user = await client.request(GET_ME)
	session.set(user)
	return { user }
}
