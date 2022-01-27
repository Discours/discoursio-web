import { client } from '$lib/client'
import { SIGN_OUT } from '$lib/queries'
import { parse, serialize, } from 'cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ headers: { cookie } }) {
    const cookies = parse(cookie || '')
    if (cookies.token) await client.request(SIGN_OUT)
    return {
     status: 200,
     headers: {
         'Set-Cookie': serialize('token', '', {
             path: '/',
             expires: new Date(0),
         }),
     },
    };
}
