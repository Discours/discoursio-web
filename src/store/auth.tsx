// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, useContext, onMount, onCleanup, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { OperationResult } from 'solid-urql'
import signCheckQuery from '../graphql/q/auth-check'
import signUpMutation from '../graphql/q/auth-register'
import signOutQuery from '../graphql/q/auth-logout'
import { CurrentUserInfo, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { useStore } from './index'
import { useI18n } from '@solid-primitives/i18n'
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
  const [promiseQuery, promiseMutation] = usePromiseQuery(props.client)
  const [t] = useI18n()
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

  const authActions = {
    getSession: () => {
      if(state.token) {
        setLoading(true)
        promiseQuery(mySession, { token: state.token })
          .then(({data, error}: OperationResult) => {
            if (error) actions.warn({ kind: 'error', body: error?.message })
            else {
              if(data.getCurrentUser.error) {
                actions.warn({ kind: 'warn', body: data.getCurrentUser.error})
                setLoggedIn(false)
              } else {
                setState({ ...state, ...data.getCurrentUser })
                actions.resetWarns()
                setLoggedIn(true)
              }
            }
            setLoading(false)
          })
      }
    },
    signIn: (email: string, password: string) => {
      console.log(`[auth] signing in`, email)
      setLoading(true)
      promiseQuery(signIn, { email, password })
        .then(({ data, error }: OperationResult) => {
          if(error) {
            actions.warn({ body: error.message, kind: 'warn'})
            setLoggedIn(false)
          } else {
            if (data?.signIn?.error) actions.warn({ body: t(data?.signIn?.error), kind: 'warn'})
            else {
              setState({ ...state, ...data.signIn })
              actions.resetWarns()
              setLoggedIn(true)
            }
          }
          setLoading(false)
        })
    },
    signUp: (email: string, password: string, username?: string) => {
      console.log(`[auth] signing up`, email)
      setLoading(true)
      promiseMutation(signUpMutation, { email, password, username })
        .then(({ data, error }: OperationResult) => {
          if(error) actions.warn({ body: error.message, kind: 'warn' })
          else {
            if(data?.registerUser?.error) actions.warn({ body: data?.registerUser?.error, kind: 'warn' })
            else {
              setState({ ...state, ...data.registerUser })
              actions.resetWarns()
              setLoggedIn(true)
            }
          }
          setLoading(false)
        })
    },
    signCheck: (email: string) => {
      console.log(`[auth] checking email`, email)
      setLoading(true)
      promiseQuery(signCheckQuery, { email })
        .then(({ data, error }: OperationResult) => {
          if (data?.isEmailUsed) actions.warn({ body: t('Email is used'), kind: 'warn'})
          if (error) actions.warn({ body: error.message, kind: 'warn'})
          setLoading(false)
        })
    },
    signOut: () => {
      console.log(`[auth] sign out`)
      setLoading(true)
      if (loggedIn()) {
        promiseQuery(signOutQuery)
          .then(({ data, error }: OperationResult) => {
            if (error) actions.warn({ body: error.message, kind: 'error' })
            if (data?.signOut?.error) actions.warn({ body: data?.signOut?.error, kind: 'warn'})
            else setLoggedIn(false)
            setLoading(false)
          })
      }
    },
    forget: async (email: string) => {
      console.log(`[auth] forget ${email}`)
      setLoading(true)
      promiseQuery(forgetPassword, { email })
        .then((signOutResult: OperationResult) => {
          const { error, data } = signOutResult
          if (error) actions.warn({ body: error.message, kind: 'error' })
          if (data?.forget?.error) actions.warn({ body: data.forget.error, kind: 'warn' })
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
        .then((resendResult: OperationResult) =>{
          const { data, error } = resendResult
          if (error) {
            actions.warn({ kind: 'error', body: error.message })
          } else {
            if(data?.resend?.error) actions.warn({ kind: 'warn', body: data.resend.error })
            else console.log('[auth] resending code')
          }
          setLoading(false)
        })
    }
  }
  createEffect(() => {
    if(state.token && !loggedIn()) {
      console.log('[auth] getting user session by token', state.token)
      authActions.getSession()
    }
  })
  return <AuthProvider value={[state as unknown as AuthStore, authActions]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
