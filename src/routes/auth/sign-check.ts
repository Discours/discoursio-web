import { client } from '$lib/client'
import { IS_EMAIL_FREE } from '$lib/queries'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
  const { email } = await request.json()
  const isEmailFree = await client.request(IS_EMAIL_FREE, { email })
  return {
    status: isEmailFree ? 200 : 409,
    body: {
      message: isEmailFree ? 'Free' : 'User already exists'
    }
  }
}
