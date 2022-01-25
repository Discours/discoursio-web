import { createCookie } from '$lib/cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post({ body, locals }) {
  const { slug, what } = body // what: topic author shout
  const { cookies } = locals
  // console.debug(subs)
  if (!cookies[what]) cookies[what] = []
  cookies[what].push(slug)
  const headers = {
    'Set-Cookie': createCookie(what, Array.from(new Set(cookies[what])))
  }
  return { headers, body: { ok: true } }
}
