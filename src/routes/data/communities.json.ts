/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/app'
import { get as getStore } from 'svelte/store'
import { GET_COMMUNITIES } from '../../graphql/queries'

export async function get() {
	const api = getStore(graphql)
	return await api.request(GET_COMMUNITIES)
}
