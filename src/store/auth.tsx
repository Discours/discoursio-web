// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, useContext, onMount, onCleanup } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { createQuery } from 'solid-urql'
import signCheck from '../graphql/q/auth-check'
import signUp from '../graphql/q/auth-register'
import signOut from '../graphql/q/auth-logout'
import { CurrentUserInfo, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { useStore } from './index'

interface AuthStore {
  readonly authorized?: boolean
  token?: string
  session?: Partial<User>
  info?: CurrentUserInfo
  handshaking?: boolean
}

const AuthContext = createContext<[AuthStore, any]>([{} as AuthStore, {}])
const AuthProvider = AuthContext.Provider

export const AuthStoreProvider = (props: any) => {
  const [loggedIn, setLoggedIn] = createSignal(false)
  const [, actions] = useStore()
  const [state, setState] = createStore({
    get authorized() {
      return loggedIn()
    },
    token: '',
    session: {} as Partial<User>,
    info: {} as CurrentUserInfo,
    handshaking: false
  })

  const listenStorage = (ev: StorageEvent) => {
    // console.log('[auth] storage event')
    console.debug(ev)

    if (ev.storageArea === window.localStorage) {
      // token update
      const t = window.localStorage.getItem('token')

      console.debug(t)

      if (t && state.token !== t) {
        setState((state) => {
          state.token = t

          return state
        }) // store setter
        console.log('[store] auth token was updated')
        console.debug(state)
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
    // auth
    authorized: () => loggedIn(),
    getInfo: () => state.info,
    getSession: (t?: string) => {
      const token = t || localStorage.getItem('token') || ''

      if (token && !state.session?.username) {
        const [qdata] = createQuery({ query: mySession, variables: { token } })
        const {
          getCurrentUser: { session, info }
        } = qdata()
        const { error } = session

        setLoggedIn(!error)

        if (!error) {
          setState({
            ...state,
            token,
            session,
            info,
            handshaking: false
          })
        } else {
          actions.warn(error)
        }
      }

      return state.session
    },
    signIn: (email: string, password: string) => {
      const [qdata] = createQuery({ query: signIn, variables: { email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ ...state, token, session: user, handshaking: false })

      setState({ ...state, handshaking: false })
      actions.resetWarns()
      setLoggedIn(true)
    },
    signUp: (username: string, email: string, password: string) => {
      const [qdata] = createQuery({ query: signUp, variables: { username, email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ ...state, token, session: user, handshaking: false })

      setState({ ...state, handshaking: false })
      actions.resetWarns()
      setLoggedIn(true)
    },
    signCheck: (email: string) => {
      const [qdata] = createQuery({ query: signCheck, variables: { email } })
      const isEmailFree = qdata()
      if (!isEmailFree) actions.warn('Email is used')
    },
    signOut: () => {
      if (loggedIn()) {
        const [qdata] = createQuery({ query: signOut })
        const { error } = qdata()

        if (!error) setLoggedIn(false)
        else actions.warn(error)
      }
    },
    forget: (email: string) => {
      console.log(`auth: forget ${email}`)
      const [qdata] = createQuery({ query: forgetPassword, variables: { email } })
      const { error } = qdata()

      if (error) actions.warn(error)
    },
    reset: (code: string) => {
      console.log(`auth: reset ${code}`)
      const [qdata] = createQuery({ query: resetPassword, variables: { code } })
      const { error } = qdata()

      if (error) actions.warn(error)
    },
    resend: (email: string) => {
      console.log(`auth: resend ${email}`)
      const [qdata] = createQuery({ query: resendCode, variables: { email } })
      const { error } = qdata()

      if (error) actions.warn(error)
    }
  }

  return <AuthProvider value={[state as unknown as AuthStore, authActions]} children={props.children} />
}

export function useAuth() {
  return useContext(AuthContext)
}
