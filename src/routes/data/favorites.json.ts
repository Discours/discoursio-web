/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { FAVORITE_SHOUTS } from '../../graphql/queries'

export const get = async () => {
	const api = getStore(graphql)
	return await api.request(FAVORITE_SHOUTS, { limit: 100 })
}
