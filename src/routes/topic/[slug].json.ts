import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC, TOPICS_BY_SLUGS } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slug } = params
		const {
			topicsBySlugs: [topic]
		} = await client.request(TOPICS_BY_SLUGS, { slugs: [slug] })
		let body
		if (topic) {
			const { shoutsByTopic: shouts } = await client.request(SHOUTS_BY_TOPIC, {
				topic: slug
			})
			body = { topic, shouts }
		}
		return { status: topic ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
