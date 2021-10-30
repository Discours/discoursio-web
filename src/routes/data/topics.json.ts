/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { api as graphql } from '../../stores/common'
import { get as getStore } from 'svelte/store'
import {
	TOPICS_BY_SLUGS,
	TOPICS_BY_COMMUNITY,
	TOPICS_BY_AUTHOR,
} from '../../graphql/queries'

const api = getStore(graphql)

export async function get({ params }) {
	const { slugs, community, author } = params
	await api
	if (slugs) return await api.request(TOPICS_BY_SLUGS, { slugs })
	else if (author) return await api.request(TOPICS_BY_AUTHOR, { author })
	else return await api.request(TOPICS_BY_COMMUNITY, { community })
}
