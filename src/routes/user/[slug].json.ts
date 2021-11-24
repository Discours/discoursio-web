import { client } from '../../lib/client'
import { GET_AUTHOR, SHOUTS_BY_AUTHOR } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
        const { slug } = params
		const { user } = await client.request( GET_AUTHOR, { slug })
        let body
		if(user) {
            body = {
                user,
                ...await client.request( SHOUTS_BY_AUTHOR, { slug }),
            }
        }
		return { status: user ? 200 : 404, body }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
