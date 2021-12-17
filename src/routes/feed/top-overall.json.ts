import { client } from '../../lib/client'
import { TOP_OVERALL } from '../../lib/queries'

export const get = async () => {
	try {
		const { topOverall } = await client.request(TOP_OVERALL, { page: 0, size: 100 })

		return {
			status: 200,
			body: { topOverall }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
