import { parse } from 'cookie'

/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	const raw = event.request.headers.get('cookie') || ''
  // console.debug(raw)
  const cookies = raw ?? parse(raw)
	const token = cookies?.token // && Buffer.from(cookies.token, 'base64').toString('utf-8')
  token && console.debug(token)
	event.locals.user = token ? { token } : null
  token && console.debug(event.locals.user)
	return await resolve(event)
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (req) => req?.locals?.user ? { ...req.locals.user } : null
