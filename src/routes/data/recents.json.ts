import { client } from '../../lib/client'
import { RECENT_SHOUTS } from '../../lib/queries'

export const get = async () => {
	try {
		const { recents } = await client.request(RECENT_SHOUTS, { limit: 100 })

		return {
			status: 200,
			body: { recents }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
