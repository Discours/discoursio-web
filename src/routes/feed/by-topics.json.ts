import { client } from '$lib/client'
import { SHOUTS_BY_TOPIC } from '$lib/queries'

export const get = async ({ params }) => {
  let shouts
  let authors
  const { slugs, page, size } = params
  if (slugs) {
    authors = {}
    try {
      slugs.forEach(async (topic) => {
        const q = await client.request(SHOUTS_BY_TOPIC, {
          topic,
          page: page || 1,
          size: size || 9
        })
        if (q.ok) {
          shouts = (await q.json())['shoutsByTopic']
          shouts.forEach((s) => s.authors.forEach((a) => (authors[a.slug] = a)))
        }
      })
      return { status: 200, body: { authors, shouts } }
    } catch (error) {
      console.error(error)
      return {
        status: 500,
        body: { error: 'There was a server error.' }
      }
    }
  }
  return { status: 404 }
}
