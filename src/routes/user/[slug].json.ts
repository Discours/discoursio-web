import { client } from '$lib/client'
import { GET_AUTHOR, GET_ROLES, SHOUTS_BY_AUTHOR } from '$lib/queries'

export const get = async ({ params }) => {
  try {
    const { slug, page, size } = params
    const { getUsersBySlugs: users } = await client.request(GET_AUTHOR, {
      slugs: [slug]
    })
    let body
    if (users.length > 0) {
      const user = users[0]
      const { shoutsByAuthor: shouts } = await client.request(
        SHOUTS_BY_AUTHOR,
        {
          author: slug,
          page: page || 1,
          size: size || 50
          // limit: 50,
        }
      )
      const { userRoles: roles } = await client.request(GET_ROLES, { slug })
      user.roles = roles
      body = { user, shouts }
    }
    return { status: users ? 200 : 404, body }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      body: { error: 'There was a server error.' }
    }
  }
}
