import { client } from '$lib/client'
import { TOP_MONTH } from '$lib/queries'

export const get = async ({ params }) => {
	const { page, size } = params
	try {
		const { topMonth } = await client.request(TOP_MONTH, {
			page: page || 1,
			size: size || 9
		})
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
