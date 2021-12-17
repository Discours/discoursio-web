import { client } from '../../lib/client'
import { TOP_VIEWED } from '../../lib/queries'

export const get = async () => {
	try {
		const { topViewed } = await client.request(TOP_VIEWED, { limit: 10 })

		return {
			status: 200,
			body: { topViewed }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
