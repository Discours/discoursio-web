import { client } from '../../lib/client'
import {
	AUTHORS_BY_SLUGS,
	SHOUTS_BY_AUTHOR
} from '../../lib/queries'

export const get = async ({ request }) => {
	try {
		// console.log(request)
		let shouts, authors
		const { authors: authorslugs } = (request && request.locals && request.locals.cookies) || {} // TODO: debug cookie-based subscriptions
		if(authorslugs) authors = await client.request(AUTHORS_BY_SLUGS, { slugs: authorslugs })['authorsBySlugs']
		if(authors) shouts = await client.request(SHOUTS_BY_AUTHOR, {
						limit: 100,
						authors: authors.map((a) => a.slug)
					}
					)['shoutsByAuthor']
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
