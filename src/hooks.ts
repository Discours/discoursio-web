/*** 
import { parse } from 'cookie'
import { GET_ME } from '$lib/queries'
import { client } from '$lib/client'

/** @type {import('@sveltejs/kit').Handle} 
/*
export async function handle({ event, resolve }) {
  const cookies = parse(event.request?.headers?.get('cookie') || '')
  if(!event.request.locals) event.request.locals = {}
  if (cookies.token) {
     session = await client.request(GET_ME)
    if (session) {
      event.request.locals.user = session
      console.dir(session)
      return resolve(event.request)
    } else { event.request.locals.user = null }
  }
  return resolve(event.request)
}

/** @type {import('@sveltejs/kit').GetSession} */
export const getSession = (req) => (req?.locals?.user ? { ...req.locals.user } : {})

