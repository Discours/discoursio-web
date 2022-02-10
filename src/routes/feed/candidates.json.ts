import { client } from '$lib/client'
import { SHOUTS_CANDIDATES } from '$lib/queries'

export const get = async ({ params }) => {
  let candidates
  const { author, page, size } = params
  // console.log('feed: candidates')
  if (author) {
    try {
      const q = await client.request(SHOUTS_CANDIDATES, { page, size })
      if (q.ok) candidates = (await q.json())['shoutsCandidates']
      return {
        status: 200,
        body: { candidates }
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
