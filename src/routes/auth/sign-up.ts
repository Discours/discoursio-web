import { client } from '$lib/client'
import { SIGN_UP } from '$lib/queries'
import { serialize } from 'cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body: { email, password } }) {

    const { token, user } = await client.request(SIGN_UP, { email, password})
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
         message: 'Successfully signed up',
     },
    };
}