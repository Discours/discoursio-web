import { client } from '../lib/client'
import { GET_SHOUT } from '../lib/queries'

export const get = async ({ params }) => {
	try {
		const { slug } = params
		const { getShoutBySlug: shout } = await client.request(GET_SHOUT, { slug })
		return { status: shout ? 200 : 404, body: { shout } }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
