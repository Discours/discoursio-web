import { client } from '../lib/client'
import { GET_SHOUT } from '../lib/queries'

export const get = async ({ params }) => {
	let res, body, status
	const { slug } = params
	try {
		res = await client.request(GET_SHOUT, { slug })
		const { getShoutBySlug: shout } = res
		body = { shout }
		status = 200
	} catch (error) {
		body = { error }
		status = res && res.ok ? 404 : 500
	}
	return { status, body }
}
