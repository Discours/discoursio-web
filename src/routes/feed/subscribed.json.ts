import { client } from '$lib/client'
import { SHOUTS_SUBSCRIBED } from '$lib/queries'

export const get = async ({ params }) => {
  let subscribed
  const { author, page, size } = params
  // console.log('feed: by-subscriptions')
  if (author) {
    try {
      const q = await client.request(SHOUTS_SUBSCRIBED, { page, size })
      if (q.ok) subscribed = (await q.json())['shoutsSubscribed']
      return {
        status: 200,
        body: { subscribed }
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
