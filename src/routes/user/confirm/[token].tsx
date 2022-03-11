import { serialize } from 'cookie'
import { useStore } from '~/store'
import type { RouteDataFunc } from 'solid-app-router'
import { onMount } from 'solid-js'

let token

export const routeData: RouteDataFunc = (props) => {
  token = props.params.token
  localStorage.setItem('token', token)
}

export default (props) => {
  const store = useStore()
  const { currentUser, token } = store[0]
  const { getSession } = store[1]
  const session = getSession(token)

  // TODO: test, session should be stored locally
  onMount(() => {
    if (session) {
      localStorage.setItem('token', session.token)
      document.cookie = serialize('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // one week
      })
    } else {
      localStorage.setItem('token', '')
      document.cookie = ''
    }

    window.close()
  })

  return <></>
}
