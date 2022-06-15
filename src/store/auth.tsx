// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, useContext, onMount, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { createMutation, createQuery, useClient } from 'solid-urql'
import signCheck from '../graphql/q/auth-check'
import signUp from '../graphql/q/auth-register'
import signOut from '../graphql/q/auth-logout'
import { CurrentUserInfo, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { useStore } from './index'
import { useI18n } from '@solid-primitives/i18n'
import { baseUrl } from '../graphql/client'

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
    getSession: (tkn?: string) => {
      setLoading(true)
      const token = tkn || localStorage.getItem('token') || ''

      if (token && !state.session?.username) {
        const [qdata, qstate] = createQuery( {query: mySession, variables: { token }})
        const { getCurrentUser: { session, info } } = qdata()
        const { error } = session

        setLoggedIn(!error)

        if (!error) {
          setState({
            ...state,
            token,
            session,
            info
          })
        } else {
          actions.warn(error)
        }
      }
      setLoading(false)
      return state.session
    },
    signIn: async (email: string, password: string) => {
      console.log(`[auth] signing in`, email)
      setLoading(true)
      const [qdata, qstate] = await createQuery( { query: signIn, variables: { email, password }})
      if(!qstate()?.fetching) {
        const { user, token, error } = qdata().signIn
        if (!error) setState({ ...state, token, session: user })
        actions.resetWarns()
        setLoggedIn(true)
      }
      if(qstate().error) {
        console.error(qstate().error)
        setLoggedIn(false)
      }

      setLoading(false)
    },
    signUp: async (email: string, password: string, username?: string) => {
      console.log(`[auth] signing up`, email)
      setLoading(true)
      const [mutRead, mutExec] = createMutation(signUp)
      const m = await mutExec({ email, password, username })
      if(mutRead().error) {
        setLoggedIn(false)
      } else {
        actions.resetWarns()
        setLoggedIn(true)
      }

      setLoading(false)
    },
    signCheck: (email: string) => {
      console.log(`[auth] checking email`, email)
      setLoading(true)
      const [qdata, qstate] = createQuery({ query: signCheck, variables: { email }, context: { url: baseUrl } })
      const isEmailUsed = qdata()
      if (isEmailUsed) {
        actions.warn({ body: t('Email is used'), kind: 'error'})
      }
      setLoading(false)
    },
    signOut: () => {
      console.log(`[auth] sign out`)
      setLoading(true)
      if (loggedIn()) {
        const [qdata] = createQuery({ query: signOut })
        const { error } = qdata().signOut
        if (error) actions.warn(error)
      }
      setLoading(false)
    },
    forget: (email: string) => {
      console.log(`[auth] forget ${email}`)
      setLoading(true)
      const [qdata] = createQuery({ query: forgetPassword, variables: { email } })
      const { error } = qdata()
      if (error) actions.warn(error)
      setLoading(false)
    },
    reset: (code: string) => {
      console.log(`auth: reset ${code}`)
      setLoading(true)
      const [qdata] = createQuery({ query: resetPassword, variables: { code } })
      const { error } = qdata()
      if (error) actions.warn(error)
      setLoading(false)
    },
    resend: (email: string) => {
      console.log(`auth: resend ${email}`)
      setLoading(true)
      const [qdata] = createQuery({ query: resendCode, variables: { email } })
      const { error } = qdata()
      if (error) actions.warn(error)
      setLoading(false)
    }
  }

  return <AuthProvider value={[state as unknown as AuthStore, authActions]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
