import { decodeCookies } from '$lib/cookie'

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  // console.dir(event.request)
  return decodeCookies(event.request.headers?.cookie || '')
}
