/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import { GET_AUTHOR } from '../../graphql/queries'

const api = getStore(graphql)

export async function get({ params, locals }) {
	console.debug(locals)
	const { author } = params
	return await api.request(GET_AUTHOR, { variables: { slug: author } })
}
