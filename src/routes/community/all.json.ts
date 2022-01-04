import { client } from '../../lib/client'
import { GET_COMMUNITIES } from '../../lib/queries'

export const get = async () => {
	try {
		const { getCommunites: communities } = await client.request(GET_COMMUNITIES)
		const body = { communities }
		return { status: communities ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error }
		}
	}
}
