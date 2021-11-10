/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_ME } from '../graphql/queries'

export async function get(req) {
    const token = req.query.get('token')
    const api = getStore(graphql)
	const session = await api.request(GET_ME, { token })
    return { session }
}