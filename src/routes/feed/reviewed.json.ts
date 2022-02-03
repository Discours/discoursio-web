import { client } from '$lib/client'
import { SHOUTS_REVIEWED } from '$lib/queries'

export const get = async ({ params }) => {
  let shouts
  const { author, page, size } = params
  console.log('feed: revieded')
  if (author) {
    try {
      const q = await client.request(SHOUTS_REVIEWED, { page, size })
      if (q.ok) shouts = (await q.json())['shoutsReviewed']
      return {
        status: 200,
        body: { shouts }
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
