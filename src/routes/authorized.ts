/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../stores/common'
import { token } from '../stores/auth'
import { get as getStore } from 'svelte/store'
import { GET_ME } from '../graphql/queries'

export async function get(req) {
    const got = req.query.get('token')
    token.set(got)
    const api = getStore(graphql)
	const session = await api.request(GET_ME)
    return { session }
}