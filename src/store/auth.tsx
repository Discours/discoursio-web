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
  session?: Partial<User>
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
    session: {} as Partial<User>,
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
          .then((mySessionResult: OperationResult) => {
            const { data, error: queryError } = mySessionResult
            // console.debug(mySessionResult)
            const { getCurrentUser: { user: session, info, error } } = data
            if (!error && !queryError) {
              console.log('[auth] got fresh session')
              setState({ ...state, session, info })
              setLoggedIn(true)
            } else {
              console.warn('[auth] session query error',queryError)
              console.log('[auth] failed', error)
              actions.warn(error)
              setLoggedIn(false)
            }
            setLoading(false)
          })
      }
    },
    signIn: (email: string, password: string) => {
      console.log(`[auth] signing in`, email)
      setLoading(true)
      promiseQuery(signIn, { email, password })
        .then((signInResult: OperationResult) => {
          const { data: { signIn: signData }, error } = signInResult
          // console.debug(signInResult)
          if(error) {
            console.error(error)
            setLoggedIn(false)
          }
          if (!signData?.error) {
            setState({ ...state, token: signData?.token, session: signData?.user })
            actions.resetWarns()
            setLoggedIn(true)
          }
          setLoading(false)
        })
    },
    signUp: (email: string, password: string, username?: string) => {
      console.log(`[auth] signing up`, email)
      setLoading(true)
      promiseMutation(signUpMutation, { email, password, username })
        .then((signUpResult: OperationResult) => {
          const { data, error: queryError } = signUpResult
          if(!queryError) { 
            const { registerUser: { user, error, token }} = data
            if(!error) setState({ ...state, session: user, token })
            setLoggedIn(false)
          } else {
            actions.warn({ kind: 'warn', body: t(queryError.message) })
            setLoggedIn(true)
          }
          setLoading(false)
        })
    },
    signCheck: (email: string) => {
      console.log(`[auth] checking email`, email)
      setLoading(true)
      promiseQuery(signCheckQuery, { email })
        .then((signCheckResult: OperationResult) => {
          // console.debug(signCheckResult)
          const { data, error } = signCheckResult
          if (data.isEmailUsed) {
            actions.warn({ body: t('Email is used'), kind: 'warn'})
          }
          if (error) {
            actions.warn({ body: t(error.message), kind: 'warn'})
          }
          setLoading(false)
        })
    },
    signOut: () => {
      console.log(`[auth] sign out`)
      setLoading(true)
      if (loggedIn()) {
        promiseQuery(signOutQuery)
          .then((signOutResult: OperationResult) => {
            const { data, error } = signOutResult
            if (error) actions.warn({ body: error.message, kind: 'error' })
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
          setLoading(false)
        })
    },
    resend: (email: string) => {
      console.log(`[auth] resend ${email}`)
      setLoading(true)
      promiseQuery(resendCode, { email })
        .then((resendResult: OperationResult) =>{
          const { data, error: queryError } = resendResult
          if (queryError) actions.warn({kind: 'error', body: queryError.message })
          setLoading(false)
        })
    }
  }
  createEffect(() => {
    if(state.token && !loggedIn()) {
      console.log('[auth] getting session by token', state.token)
      authActions.getSession()
    }
  })
  return <AuthProvider value={[state as unknown as AuthStore, authActions]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
