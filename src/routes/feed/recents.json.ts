import { client } from '$lib/client'
import { RECENT_SHOUTS } from '$lib/queries'

export const get = async ({ params }) => {
	try {
		const { page } = params
		const { recents } = await client.request(RECENT_SHOUTS, {
			page: page || 0,
			size: 27
		})
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
