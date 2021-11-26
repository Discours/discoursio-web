import { client } from '../../lib/client'
import { GET_COMMUNITIES, SHOUTS_BY_COMMUNITY } from '../../lib/queries'

export const get = async ({ params }) => {
	try {
		const { community: slug } = params
		if (slug in ['top-month', 'recents', 'top-overall']) return
		const {
			communities: [community]
		} = await client.request(GET_COMMUNITIES, { slugs: [slug] })
		if (community) {
			const { shoutsByCommunity: shouts } = await client.request(
				SHOUTS_BY_COMMUNITY,
				{ limit: 100, community: slug }
			)
			return { status: 200, body: { community, shouts } }
		}
		return { status: 404 }
	} catch (error) {
		console.error(error)
		return {
			status: 500,
			body: { error: 'There was a server error.' }
		}
	}
}
