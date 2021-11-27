import { client } from '../../lib/client'
import { SHOUTS_BY_AUTHOR } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slug: author } = params
		const { shoutsByAuthor: shouts } = await client.request(SHOUTS_BY_AUTHOR, { author })
		let ttt = new Set([])
		shouts.forEach(s => s.topics.forEach(t => ttt.add(t)))
		const topics = Array.from(ttt)
		return { status: shouts ? 200 : 404, body: { shouts, topics, author } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
