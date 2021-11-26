import { client } from '../../lib/client'
import { TOPICS_BY_AUTHOR } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slug: author } = params
		const { topicsByAuthor: topics } = await client.request(TOPICS_BY_AUTHOR, {
			author
		})
		return { status: topics ? 200 : 404, body: { topics, author } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
