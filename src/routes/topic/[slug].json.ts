import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC, TOPICS_BY_SLUGS  } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
        const { slug } = params
		const { topics } = await client.request(TOPICS_BY_SLUGS, { slugs: [slug] })
		let body 
		if(topics) {
			body = {
				...topics,
				...await client.request(SHOUTS_BY_TOPIC, { topic: slug })
			}
		}
		return { status: topics? 200: 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
