import { client } from '../../lib/client'
import { TOP_MONTH } from '../../lib/queries'

export const get = async () => {
	try {
		const { topMonth } = await client.request(TOP_MONTH, { page: 0, size: 100 })

		return {
			status: 200,
			body: { topMonth }
		}
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
