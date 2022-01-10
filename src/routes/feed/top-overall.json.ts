import { client } from '$lib/client'
import { TOP_OVERALL } from '$lib/queries'

export const get = async ({ params }) => {
	const { page, size } = params
	try {
		const { topOverall } = await client.request(TOP_OVERALL, {
			page: page || 1,
			size: size || 9
		})
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
