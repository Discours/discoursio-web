import { client } from '$lib/client'
import { GET_ME } from '$lib/queries'

import { session, token } from '../../stores/user'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const { token: got } = params
  if (got && !got.startsWith('sign-')) {
    token.set(got)
    const user = await client.request(GET_ME)
    session.set(user)
    window.close()
    return {
      headers: { 'Set-Cookie': 'token=' + got + '; path=/' },
      body: { ok: true }
    }
  } else {
    return {
      body: {
        error: 'No token was provided'
      }
    }
  }
}
