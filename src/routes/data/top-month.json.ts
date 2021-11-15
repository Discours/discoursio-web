/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/app'
import { get as getStore } from 'svelte/store'
import { TOP_MONTH } from '../../graphql/queries'

export const get = async () => {
	const api = getStore(graphql)
	return await api.request(TOP_MONTH, { limit: 100 })
}
