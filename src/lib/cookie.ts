import { parse } from 'cookie'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

const method = 'POST'

const subscribe = async (slug, what) => {
  let subscribed
  console.log(what + ' subscribing ' + slug)
  const r = await fetch('/feed/subscribe', {
    method,
    headers,
    body: JSON.stringify({ slug, what })
  })
  if (r.ok) subscribed = true
  else console.error('failed')
  return subscribed
}

const unsubscribe = async (slug, what) => {
  let subscribed
  console.log(what + ' unsubscribing ' + slug)
  const r = await fetch('/feed/unsubscribe', {
    method,
    headers,
    body: JSON.stringify({ slug, what })
  })
  if (r.ok) subscribed = false
  else console.error('failed')
  return subscribed
}

const getCookie = (entity: string): string => parse(document.cookie)[entity]

const getSubscriptions = async (entity) => {  
  let r = []
  try {
    const c = getCookie(entity)
    console.log(`cookie: ${entity} subscriptions`)
    console.debug(c)
    if (c) r = await JSON.parse(c)
  } catch (e) {
    console.error(e)
  }
  return r
}

export {
  getCookie,
  getSubscriptions,
  subscribe,
  unsubscribe
}