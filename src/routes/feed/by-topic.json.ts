import { client } from '../../lib/client'
import { SHOUTS_BY_TOPIC } from '../../lib/queries'

export const post = async ({ params }) => {
	let shouts,
		authors = {}
	const { topics: topicslugs } = params
	if (topicslugs) {
		try {
			topicslugs.forEach(async (topic) => {
				const q = await client.request(SHOUTS_BY_TOPIC, { limit: 27, topic })
				if (q.ok) {
					shouts = (await q.json())['shoutsByTopic']
					shouts.forEach((s) => s.authors.forEach((a) => (authors[a.slug] = a)))
				}
			})
			return { status: 200, body: { authors, shouts } }
		} catch (error) {
			console.error(error)
			return {
				status: 500,
				body: { error: 'There was a server error.' }
			}
		}
	}
	return { status: 404 }
}
