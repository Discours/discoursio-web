import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC } from '../../lib/queries'

export const get = async ({ request }) => {
	try {
		// console.log(request)
		let shouts,
			authors = {}
		const { topics } = (request && request.locals && request.locals.cookies) || {} // TODO: debug cookie-based subscriptions
		topics.forEach(async (topic) => {
			shouts = await client.request(SHOUTS_BY_TOPIC, {
				limit: 100,
				topic
			})['shoutsByTopic']
			shouts.forEach((s) => s.authors.forEach((a) => (authors[a.slug] = a)))
		})

		return {
			status: 200,
			body: { authors, shouts }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
