import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slug } = params
		const { shoutsByTopic: shouts } = await client.request(SHOUTS_BY_TOPIC, { topic: slug })
		const body = { shouts }
		return { status: shouts ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
