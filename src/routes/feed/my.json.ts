import { client } from '../../lib/client'
import {
	TOPICS_BY_SLUGS,
	AUTHORS_BY_SLUGS,
	SHOUTS_BY_TOPIC
} from '../../lib/queries'

export const get = async ({ request }) => {
	try {
		// console.log(request)
		const { topics: slugs, authors: authorslugs } =
			(request && request.locals && request.locals.cookies) || {} // TODO: debug cookie-based subscriptions
		const { topicsBySlugs: topics } = await client.request(TOPICS_BY_SLUGS, {
			slugs
		})
		const { shoutsByTopic: shouts } = await client.request(SHOUTS_BY_TOPIC, {
			topics: topics.map((t) => t.slug)
		})
		const { authorsBySlugs: authors } = await client.request(AUTHORS_BY_SLUGS, {
			slugs: authorslugs
		})
		return {
			status: shouts || authors || topics ? 200 : 404,
			body: { authors, shouts, topics }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
