import { client } from '../../lib/client'
import { TOPICS_ALL } from '../../lib/queries'

export const get = async ({}) => {
	try {
		const { topicsAll: topics } = await client.request(TOPICS_ALL)
		console.debug(topics)
		return { status: topics ? 200 : 404, body: { topics } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
