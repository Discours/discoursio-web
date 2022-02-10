import { client } from '$lib/client'
import { TOPICS_ALL } from '$lib/queries'

export const get = async () => {
  try {
    const { topicsBySlugs: topicsAll } = await client.request(TOPICS_ALL )
    const body = { topicsAll }
    return { status: topicsAll ? 200 : 404, body }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error }
    }
  }
}
