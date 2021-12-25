import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC } from '../../lib/queries'
import { get as getStore } from 'svelte/store'
import { topics } from '../../stores/zine'

const ttt = getStore(topics)

export const get = async ({ params }) => {
	try {
		const { slug: topic } = params
		const { shoutsByTopic: shouts } = await client.request(SHOUTS_BY_TOPIC, {
			topic,
			limit: 20
		})
		let authors = {}
		shouts.forEach((s) => s.authors.forEach((a) => (authors[a.slug] = a)))
		const body = { shouts, authors }
		return { status: shouts ? 200 : 404, body, topic: ttt[topic] }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
