import { client } from '../../lib/client'
import { TOPICS_BY_SLUGS } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slugs } = params
		const { topicsBySlugs: topics } = await client.request(TOPICS_BY_SLUGS, {
			slugs
		})
		const body = { topics }
		return { status: topics ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
