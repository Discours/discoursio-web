import { client } from '$lib/client'
import { SHOUTS_COMMENTED } from '$lib/queries'

export const get = async ({ params }) => {
  let commented
  const { author, page, size } = params
  console.log('feed: commented')
  if (author) {
    try {
      const q = await client.request(SHOUTS_COMMENTED, { page, size })
      if (q.ok) commented = (await q.json())['shoutsCommented']
      return {
        status: 200,
        body: { commented }
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
