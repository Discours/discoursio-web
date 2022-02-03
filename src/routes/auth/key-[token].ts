import { serialize } from 'cookie'

import { client } from '$lib/client'
import { GET_ME } from '$lib/queries'

import { session, token } from '../../stores/user'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  const { token: got } = params
  if (got) {
    token.set(got)
    const user = await client.request(GET_ME)
    session.set(user)
    // window.close()
    return {
      status: 200,
      headers: {
        'Set-Cookie': serialize('token', token, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7 // one week
        })
      },
      body: {
        message: 'Successfully signed in'
      }
    }
  }
}
