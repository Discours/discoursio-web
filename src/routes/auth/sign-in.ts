import { client } from '$lib/client'
import { SIGN_IN } from '$lib/queries'
import { serialize } from 'cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ request }) {
    // console.dir(request.body)
    const { body: { email, password } } = request.body
    const { token, user } = await client.request(SIGN_IN, { email, password})
    return {
     status: 200,
     headers: {
         'Set-Cookie': serialize('token', token, {
             path: '/',
             httpOnly: true,
             sameSite: 'strict',
             secure: process.env.NODE_ENV === 'production',
             maxAge: 60 * 60 * 24 * 7, // one week
         }),
     },
     body: {
         message: 'Successfully signed in',
     },
    };
}