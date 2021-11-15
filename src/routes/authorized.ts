import { api as graphql } from '../stores/app'
import { token, session } from '../stores/user'
import { get as getStore } from 'svelte/store'
import { GET_ME } from '../graphql/queries'

export async function get(req) {
	const got = req.query.get('token')
	token.set(got)
	const api = getStore(graphql)
	const user = await api.request(GET_ME)
	session.set(user)
	return { user }
}
