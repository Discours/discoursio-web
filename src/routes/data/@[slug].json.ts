import { api as graphql } from '../../stores/app'
import { get as getStore } from 'svelte/store'
import { GET_AUTHOR } from '../../graphql/queries'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function get({ params }) {
	const api = getStore(graphql)
	return await api.request(GET_AUTHOR, { ...params })
}
