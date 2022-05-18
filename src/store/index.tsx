// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, createEffect, onMount, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { createQuery } from 'solid-urql'
import signCheck from '../graphql/q/auth-check'
import signUp from '../graphql/q/auth-register'
import signOut from '../graphql/q/auth-logout'
import { Topic, User } from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
import topicsAll from '../graphql/q/topics-all'
import fq from '../graphql/q/follow'
import ufq from '../graphql/q/unfollow'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
import { useClient } from '../graphql/client'

type ModalType = '' | 'auth' | 'subscribe' | 'feedback' | 'share' | 'thank' | 'donate'
type WarnKind = 'error' | 'warn' | 'info'

export interface Warning {
  body: string
  kind: WarnKind
  seen?: boolean
}

interface Subscriber {
  userSubscribedTopics: string[]
  userSubscribedAuthors: string[]
  totalUnreadMessages: number
}

interface CommonStore {
  readonly topics: { [key: string]: Topic }
  readonly currentUser: Partial<User> & Subscriber
  page?: number
  totalPagesCount?: number
  token?: string
  appName: string
  session?: Partial<User> & Subscriber
  handshaking?: boolean
  warnings?: Warning[]
  modal?: ModalType
}

const initState = {
  page: 0,
  totalPagesCount: 0,
  token: '',
  appName: 'discours.io',
  session: {} as Partial<User> & Subscriber,
  handshaking: false,
  warnings: [] as Warning[],
  modal: '' as ModalType
}

const StoreContext = createContext<[CommonStore, any]>([initState as CommonStore, {}])
const StoreContextProvider = StoreContext.Provider

export function StoreProvider(props: { children: any }) {
  // const [loggedIn, setLoggedIn] = createSignal(false)
  const client = useClient()
  const [topicsUpdated, setTopicsUpdated] = createSignal(false)
  const [state, setState] = createStore({
    get currentUser() {
      return state.session
    },
    topics: {} as {[key:string]:Topic},
    page: 0,
    totalPagesCount: 0,
    token: '',
    appName: 'discours.io',
    session: {} as (Partial<User> & Subscriber),
    handshaking: false,
    warnings: [] as Warning[],
    modal: '' as ModalType
  })

  const actions = {
    // warnings
    warn: (w: Warning) => setState({ ...state, warnings: [...state.warnings, w] }),
    unwarn: (index: number) => {
      let w: Warning = state.warnings[index]

      w.seen = true
      setState({ ...state, warnings: [...state.warnings, w] })
    },
    showModal: (name: ModalType) => setState({ ...state, modal: name }),
    hideModal: () => setState({ ...state, modal: '' }),
    // auth
    getSession: () => {
      setState({ ...state, token: localStorage.getItem('jwt') || '' })

      if (state.token) {
        // eslint-disable-next-line no-shadow
        const [qdata, qstate] = createQuery({ query: mySession, variables: { token: state.token } })
        const { getCurrentUser: session } = qdata()
        const { error } = session
        if(!error) setState({
          ...state, 
          session,
          handshaking: false
        })
        else warn(error)
      }
    },
    signIn: (email: string, password: string) => {
      const [qdata] = createQuery({ query: signIn, variables: { email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ ...state, token, session: user, handshaking: false })

      setState({ ...state, warnings: [...state.warnings, error], handshaking: false })
      setLoggedIn(true)
    },
    signUp: (username: string, email: string, password: string) => {
      const [qdata] = createQuery({ query: signUp, variables: { username, email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ ...state, token, session: user, handshaking: false })

      setState({ ...state, warnings: [...state.warnings, error], handshaking: false })
      // setLoggedIn(true)
    },
    signCheck: (email: string) => {
      const [qdata] = createQuery({ query: signCheck, variables: { email } })
      const { error } = qdata()

      if (error) {
        setState({ ...state, warnings: [...state.warnings, error] })

        return false
      }

      return true
    },
    signOut: () => {
      const [qdata] = createQuery({ query: signOut })
      const { error } = qdata()

      if (!error) setLoggedIn(false)
      else warn(error)
    },
    forget: (email: string) => {
      console.log(`auth: forget ${email}`)
      const [qdata] = createQuery({ query: forgetPassword, variables: { email }})
      const { error } = qdata()
      if(error) warn(error)
    },
    reset: (code: string) => {
      console.log(`auth: reset ${code}`)
      const [qdata] = createQuery({ query: resetPassword, variables: { code }})
      const { error } = qdata()
      if(error) warn(error)
    },
    resend: (email: string) => {
      console.log(`auth: resend ${email}`)
      const [qdata] = createQuery({ query: resendCode, variables: { email }})
      const { error } = qdata()
      if(error) warn(error)
    },
    follow: (slug: string, what: string) => {
      console.log(`follow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: fq, variables: { what, slug }})
      const { error } = qdata()
      if(error) warn(error)
    },
    unfollow: (slug: string, what: string) => {
      console.log(`unfollow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: ufq, variables: { what, slug }})
      const { error } = qdata()
      if(error) warn(error)
    }
  }

  createEffect(() => {
    if(state.token) actions.getSession()
    // if(client.url === 'https://newapi.discours.io' && !topicsUpdated()) actions.topicsAll()
  })

  return <StoreContextProvider value={[state as CommonStore, actions]} children={props.children} />
}

export function useStore() {
  return useContext(StoreContext)
}
