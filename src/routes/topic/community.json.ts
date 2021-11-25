import { client } from '../../lib/client'
import { TOPICS_BY_COMMUNITY } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
        const { slug: community } = params
		const { topicsByCommunity: topics } = await client.request(TOPICS_BY_COMMUNITY, { community })
		return { status: topics? 200 : 404, body: { topics, community } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
