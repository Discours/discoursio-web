// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, useContext, onMount, onCleanup, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { OperationResult } from 'solid-urql'
import signUpMutation from '../graphql/q/auth-register'
import signOutQuery from '../graphql/q/auth-logout'
import { CurrentUserInfo, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { useStore } from './index'
import { usePromiseQuery } from '../utils/promiseQuery'

interface AuthStore {
  readonly authorized?: boolean
  readonly handshaking?: boolean
  token?: string
  user?: Partial<User>
  info?: CurrentUserInfo
}

const AuthContext = createContext<[AuthStore, any]>([{} as AuthStore, {}])
const AuthProvider = AuthContext.Provider

export const AuthStoreProvider = (props: any) => {
  const [loggedIn, setLoggedIn] = createSignal(false)
  const [loading, setLoading] = createSignal(false)
  const [, actions] = useStore()
  const [state, setState] = createStore({
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
      // token update
      const tkn = window.localStorage.getItem('token')
      if (tkn) {
        if(state.token !== tkn) {
          setState((curState) => {
            curState.token = tkn
            return state
          }) // store setter
          console.log('[auth] token was updated from localStorage')
        } else {
          console.log('[auth] token in localStorage is up to date')
        }
      }
    }
  }
  onMount(() => {
    console.log('[store] listening localStorage changes')
    window.addEventListener('storage', listenStorage)
  })
  onCleanup(() => {
    window.removeEventListener('storage', listenStorage, false)
  })

  // graphql client promisified
  const [promiseQuery, promiseMutation] = usePromiseQuery(props.client)

  createEffect(() => {
    if(state.token && (!state.user || !loggedIn())) {
      console.log('[auth] getting user session by token', state.token)
      setLoading(true)
      promiseQuery(mySession, { token: state.token })
        .then(({ data, error}: OperationResult) => {
          const value: any = Object.values(data).pop()
          if(error || value?.error) {
            actions.warn({ body: error?.message || value?.error, kind: 'warn' })
            setLoggedIn(false)
          } else {
            console.debug(value)
            setState({ ...state, ...data.getCurrentUser })
            actions.resetWarns()
            setLoggedIn(true)
          }
          setLoading(false)
        })
    }
  })

  const authActions = {
    signIn: (email: string, password: string) => {
      console.log(`[auth] signing in`, email)
      if(!loggedIn()) {
        setLoading(true)
        promiseQuery(signIn, { email, password })
          .then(({ data, error }: OperationResult) => {
            const value: any = Object.values(data).pop()
            if(error || value?.error) {
              actions.warn({ body: error?.message || value?.error, kind: 'warn' })
              setLoggedIn(false)
            } else {
              console.debug(value)
              setState({ ...state, ...data.signIn })
              actions.resetWarns()
              setLoggedIn(true)
            }
            setLoading(false)
          })
      }
    },
    signUp: (email: string, password: string, username?: string) => {
      console.log(`[auth] signing up`, email)
      if(!loggedIn()) {
        setLoading(true)
        promiseMutation(signUpMutation, { email, password, username })
          .then(({ data, error}: OperationResult) => {
            const value: any = Object.values(data).pop()
            if(error || value?.error) {
              actions.warn({ body: error?.message || value?.error, kind: 'warn' })
              setLoggedIn(false)
            } else {
              console.debug(value)
              setState({ ...state, ...data.registerUser })
              actions.resetWarns()
              setLoggedIn(true)
            }
            setLoading(false)
          })
      }
    },
    signOut: () => {
      console.log(`[auth] sign out`)
      setLoading(true)
      if (loggedIn()) {
        promiseQuery(signOutQuery)
          .then(({ data, error }: OperationResult) => {
            const value: any = Object.values(data).pop()
            if (error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn'})
            else setLoggedIn(false)
            setLoading(false)
          })
      }
    },
    forget: async (email: string) => {
      console.log(`[auth] forget ${email}`)
      setLoading(true)
      promiseQuery(forgetPassword, { email })
        .then(({ data, error }: OperationResult) => {
          const value: any = Object.values(data).pop()
          if (error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          setLoading(false)
        })
    },
    reset: (code: string) => {
      console.log(`[auth] reset ${code}`)
      setLoading(true)
      promiseQuery(resetPassword, { code })
        .then((resetResult: OperationResult) => {
          const { error, data } = resetResult
          if (error) actions.warn({body: error.message, kind: 'warn'})
          if (data?.reset?.error) actions.warn({ body: data.error, kind: 'warn' })
          setLoading(false)
        })
    },
    resend: (email: string) => {
      console.log(`[auth] resend ${email}`)
      setLoading(true)
      promiseQuery(resendCode, { email })
        .then(({ data, error }: OperationResult) => {
          const value: any = Object.values(data).pop()
          if (error || value?.error) actions.warn({ body: error?.message || value?.error, kind: 'warn' })
          else {
            console.log('[auth] code resended successfully')
          }
          setLoading(false)
        })
    }
  }
  return <AuthProvider value={[state as unknown as AuthStore, authActions]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
