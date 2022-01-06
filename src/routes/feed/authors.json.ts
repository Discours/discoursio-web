import { client } from '$lib/client'
import { AUTHORS_BY_SLUGS, SHOUTS_BY_AUTHOR } from '$lib/queries'

export const post = async ({ params }) => {
	let shouts, authors
	const { authors: authorslugs } = params
	if (authorslugs) {
		try {
			const q = await client.request(AUTHORS_BY_SLUGS, { slugs: authorslugs })
			if (q.ok) {
				authors = (await q.json())['authorsBySlugs']
				const sq = await client.request(SHOUTS_BY_AUTHOR, {
					limit: 27,
					authors: authors.map((a) => a.slug)
				})
				if (sq.ok) shouts = (await sq.json())['shoutsByAuthor']
			}
			return {
				status: 200,
				body: { authors, shouts }
			}
		} catch (error) {
			console.error(error)
			return {
				status: 500,
				body: { error: 'There was a server error.' }
			}
		}
	}
	return { status: 404, body: {} }
}
