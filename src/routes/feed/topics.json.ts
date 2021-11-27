import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC } from '../../lib/queries'

export const get = async ({ request }) => {
	try {
		// console.log(request)
		let shouts, authors
		const { topics } = (request && request.locals && request.locals.cookies) || {} // TODO: debug cookie-based subscriptions
		if(authors) shouts = await client.request(SHOUTS_BY_TOPIC, {
						limit: 100,
						topics
					}
				)['shoutsByTopic']
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
