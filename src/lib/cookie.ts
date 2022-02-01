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

const createCookie = (name: string, value: any, days = 0) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  return name + '=' + value + expires + '; path=/'
}

const decodeCookies = (from) => {
  const cookie = {}
  from.split(';').forEach((el) => {
    const [key, value] = el.split('=')
    cookie[key.trim()] = value
  })
  return cookie
}

const getCookie = (cookieName, from = document.cookie) =>
  decodeCookies(from)[cookieName]

const getSubscriptions = async (entity) => {
  let r = []
  try {
    const c = getCookie(entity)
    console.debug(c)
    if (c) r = await JSON.parse(c)
  } catch (e) {
    console.error(e)
  }
  return r
}

export {
  createCookie,
  decodeCookies,
  getCookie,
  getSubscriptions,
  subscribe,
  unsubscribe
}
