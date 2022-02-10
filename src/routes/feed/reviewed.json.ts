import { client } from '$lib/client'
import { SHOUTS_REVIEWED } from '$lib/queries'

export const get = async ({ params }) => {
  let reviewed
  const { author, page, size } = params
  // console.log('feed: revieded')
  if (author) {
    try {
      const q = await client.request(SHOUTS_REVIEWED, { page, size })
      if (q.ok) reviewed = (await q.json())['shoutsReviewed']
      return {
        status: 200,
        body: { reviewed }
      }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        body: { error: 'There was a server error.' }
      }
    }
  }
  return { status: 404, body: {} }
}
