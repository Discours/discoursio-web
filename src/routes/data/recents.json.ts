/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/app'
import { get as getStore } from 'svelte/store'
import { RECENT_SHOUTS } from '../../graphql/queries'

export const get = async () => {
	const api = getStore(graphql)
	const r = await api.request(RECENT_SHOUTS, { limit: 100 })
	console.debug(r)
	return r
}
