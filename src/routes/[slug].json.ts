import { client } from '../lib/client'
import { GET_SHOUT, GET_COMMENTS } from '../lib/queries'

export const get = async ({ params }) => {
	let res, body, status
	const { slug } = params
	try {
		res = await client.request(GET_SHOUT, { slug })
		const { getShoutBySlug: shout } = res
		if (shout) res = await client.request(GET_COMMENTS, { shout: shout.id })
		const { getShoutComments: comments } = res
		body = { shout, comments }
		status = 200
	} catch (error) {
		body = { error }
		status = res && res.ok ? 404 : 500
	}
	return { status, body }
}
