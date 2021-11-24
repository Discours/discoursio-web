import { client } from '../../lib/client'
import { GET_SHOUT, SHOUTS_BY_TOPIC } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
        const { slug } = params
		let body
        body = await client.request(GET_SHOUT, { slug })
        if(!body) {
			body = await client.request(SHOUTS_BY_TOPIC, { topic: slug })
			if(!body) return { status: 404 }
			else return { status: 200, body }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
