import { client } from '../../lib/client'
import { TOPICS_BY_COMMUNITY } from '../../lib/queries'

export const get = async (payload) => {
	// console.log('getting feed/topics.json')
	// console.debug(payload)
	try {
		const community = 'discours' // FIXME
		const { topicsByCommunity: topics } = await client.request(TOPICS_BY_COMMUNITY, { community })
		// console.debug(topics)
		return { status: topics? 200 : 404, body: { topics, community } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
