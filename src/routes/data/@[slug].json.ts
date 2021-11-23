import { client } from '../../lib/client'
import { GET_AUTHOR, SHOUTS_BY_COMMUNITY, TOPICS_BY_COMMUNITY } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
        const { slug } = params
		let body
        body = await client.request(GET_AUTHOR, { slug })
		if (!body) {
			body = {
				...await client.request(SHOUTS_BY_COMMUNITY, { community: slug }),
				...await client.request(TOPICS_BY_COMMUNITY, { community: slug })
			}
			if(!body) return { status: 404 }
			else return { status: 200, body }
		}

		return {
			status: 200,
			body
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
