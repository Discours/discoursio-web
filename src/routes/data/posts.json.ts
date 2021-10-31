/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { RECENT_SHOUTS } from '../../graphql/queries'

export const get = async () => {
	const api = getStore(graphql)
	return await api.request(RECENT_SHOUTS, { limit: 100 })
}
