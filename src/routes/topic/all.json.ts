import { client } from '../../lib/client'
import { TOPICS_ALL } from '../../lib/queries'

export const get = async ({ }) => {
	try {
		const { topicsBySlugs: topics } = await client.request(TOPICS_ALL)
		const body = { topics }
		return { status: topics ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error }
		}
	}
}
