// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, useContext, onMount, onCleanup, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { useClient, Client } from 'solid-urql'
import signUpMutation from '../graphql/q/auth-register'
import signOutQuery from '../graphql/q/auth-logout'
import { CurrentUserInfo, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { usePromiseQuery } from '../utils/promiseQuery'
import { cache, handleUpdate, loading, setLoading } from './_api'

interface AuthState {
  readonly authorized?: boolean
  readonly handshaking?: boolean
  token?: string
  user?: Partial<User>
  info?: CurrentUserInfo
}

const AuthContext = createContext<[AuthState, any]>([{} as AuthState, {}])
const AuthProvider = AuthContext.Provider

export const AuthStoreProvider = (props: any) => {
  const client: Client = !!props.client ? props.client : useClient()
  const [promiseQuery, promiseMutation] = usePromiseQuery(client)
  const [loggedIn, setLoggedIn] = createSignal(false)

  const [authState, setState] = createStore({
    get authorized() {
      return loggedIn()
    },
    get handshaking() {
      return loading()
    },
    token: '',
    user: {} as Partial<User>,
    info: {} as CurrentUserInfo
  })

  const listenStorage = (ev: StorageEvent) => {
    if (ev.storageArea === window.localStorage) {
      console.log('[auth] localStorage event ', ev)
      // token update
      const tkn = window.localStorage.getItem('token')
      if (tkn) {
        if(authState.token !== tkn) {
          setState((curState) => {
            curState.token = tkn
            return authState
          }) // store setter
          console.log('[auth] token was updated from localStorage')
        } else {
          console.log('[auth] token in localStorage is up to date')
        }
      }
    }
  }
  onMount(() => window.addEventListener('storage', listenStorage))
  onCleanup(() =>  window.removeEventListener('storage', listenStorage, false))

  createEffect(()=>{
    if(authState.token && !loggedIn()) {
      console.log('[auth] getCurrentUser was cached')
      setLoading(true)
      promiseQuery(mySession, { token: authState.token })
        .then(handleUpdate)
        .then(() => setLoggedIn(true))
        .catch(() => setLoggedIn(false))
    }
  })

  const authActions = {
    signIn: (email: string, password: string) => {
      console.log(`[auth] signing in`, email)
      if(!loggedIn()) {
        setLoading(true)
        promiseQuery(signIn, { email, password })
          .then(handleUpdate)
          .then(() => setLoggedIn(true))
          .catch(() => {
            console.log('[auth] signIn failed', cache()['signIn'])
            setLoggedIn(false)
          })
      }
    },
    signUp: (email: string, password: string, username?: string) => {
      console.log(`[auth] signing up`, email)
      if(!loggedIn()) {
        setLoading(true)
        promiseMutation(signUpMutation, { email, password, username })
          .then(handleUpdate)
          .then(() => setLoggedIn(true))
          .catch(() => setLoggedIn(false))
      }
    },
    signOut: () => {
      console.log(`[auth] sign out`)
      if (loggedIn()) {
        promiseQuery(signOutQuery)
          .then(() => setLoggedIn(false))
      }
    },
    forget: async (email: string) => {
      console.log(`[auth] forget ${email}`)
      promiseQuery(forgetPassword, { email })
        .then(handleUpdate)
    },
    reset: (code: string) => {
      console.log(`[auth] reset ${code}`)
      promiseQuery(resetPassword, { code })
        .then(handleUpdate)
    },
    resend: (email: string) => {
      console.log(`[auth] resend ${email}`)
      promiseQuery(resendCode, { email })
        .then(handleUpdate)
    }
  }
  return <AuthProvider value={[authState, authActions as any]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
