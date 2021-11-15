/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/app'
import { get as getStore } from 'svelte/store'
import { GET_SHOUT } from '../../graphql/queries'

export async function get({ params }) {
	const api = getStore(graphql)
	return await api.request(GET_SHOUT, { ...params })
}

export async function put(request) {
	console.log('put', request)
	// TODO: post the shout on discours
}
