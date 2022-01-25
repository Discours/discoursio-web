import { client } from '$lib/client'
import { SHOUTS_BY_TOPIC } from '$lib/queries'

export const get = async ({ params }) => {
  try {
    const { slug: topic, page, size } = params
    if (topic in ['all', 'author']) return
    const { shoutsByTopic: shouts, errors } = await client.request(
      SHOUTS_BY_TOPIC,
      {
        topic,
        page: page || 1,
        size: size || 27
        // limit: 50,
      }
    )
    if (errors) {
      errors.forEach(console.error)
      throw 'Error'
    }
    const authors = {}
    shouts.forEach((s) => s.authors.forEach((a) => (authors[a.slug] = a)))
    const body = { shouts, authors }
    return { status: shouts ? 200 : 404, body }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'There was a server error.' }
    }
  }
}
