// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { createContext, createSignal, createEffect, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/auth-session'
import { createQuery } from 'solid-urql'
import signCheck from '../graphql/q/auth-check'
import signUp from '../graphql/q/auth-register'
import signOut from '../graphql/q/auth-logout'
import { Shout} from '../graphql/types.gen'
import signIn from '../graphql/q/auth-login'
// import topicsAll from '../graphql/q/topics-all'
import fq from '../graphql/q/follow'
import ufq from '../graphql/q/unfollow'
import forgetPassword from '../graphql/q/auth-forget'
import resetPassword from '../graphql/q/auth-reset'
import resendCode from '../graphql/q/auth-resend'
// import { useClient } from '../graphql/client'
import articlesForAuthor from '../graphql/q/articles-for-author'
import articlesForTopic from '../graphql/q/articles-for-topic'

type ModalType = '' | 'auth' | 'subscribe' | 'feedback' | 'share' | 'thank' | 'donate'
type WarnKind = 'error' | 'warn' | 'info'
interface CommonStore {
  page?: number
  size?: number
  token?: string
  appName: string
  session?: any
  handshaking?: boolean
  warnings?: {
    body: string
    kind: WarnKind
    seen?: boolean
  }[]
  modal?: ModalType
  warningsVisible: boolean
}

const StoreContext = createContext<[CommonStore, any]>([{} as CommonStore, {}])
const StoreContextProvider = StoreContext.Provider
export interface Warning {
  body: string
  kind: WarnKind
  seen?: boolean
}

export function StoreProvider(props: { children: any }) {
  const moreQueries = {
    'author': articlesForAuthor,
    'topic': articlesForTopic
    // TODO: 'community': articlesForCommunity
  }
  const [loggedIn, setLoggedIn] = createSignal(false)
  // const client = useClient()
  // const [topicsUpdated, setTopicsUpdated] = createSignal(false)
  const [state, setState] = createStore({
    page: 0,
    size: 50,
    token: '',
    appName: 'discours.io',
    session: {} as any,
    handshaking: false,
    warnings: [] as Warning[],
    modal: '' as ModalType,
    articles: [] as Partial<Shout>,
    warningsVisible: false
  })

  const actions = {
    // warnings
    getWarnings: () => state.warnings, 
    toggleWarnings: () => setState({...state, warningsVisible: !state.warningsVisible}),
    warn: (w: Warning) => setState({ ...state, warnings: [...state.warnings, w] }),
    unwarn: (index: number) => {
      let w: Warning = state.warnings[index]

      w.seen = true
      setState({ ...state, warnings: [...state.warnings, w] })
    },

    // modal
    getModal: () => state.modal,
    showModal: (name: ModalType) => setState({ ...state, modal: name }),
    hideModal: () => setState({ ...state, modal: '' }),

    // auth
    getSession: () => {
      const token = localStorage.getItem('jwt') || ''
      setState({ ...state, token })

      if (token) {
        // eslint-disable-next-line no-shadow
        const [qdata,] = createQuery({ query: mySession, variables: { token } })
        const { getCurrentUser: session } = qdata()
        const { error } = session
        if(!error) setState({
          ...state,
          token,
          session,
          handshaking: false
        })
        else actions.warn(error)
      }
    },
    signIn: (email: string, password: string) => {
      const [qdata] = createQuery({ query: signIn, variables: { email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ ...state, token, session: user, handshaking: false })

      setState({ ...state, warnings: [...state.warnings, error], handshaking: false })
      // setLoggedIn(true)
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
      if(loggedIn()) {
        const [qdata] = createQuery({ query: signOut })
        const { error } = qdata()
  
        if (!error) setLoggedIn(false)
        else actions.warn(error)
      }
    },
    forget: (email: string) => {
      console.log(`auth: forget ${email}`)
      const [qdata] = createQuery({ query: forgetPassword, variables: { email }})
      const { error } = qdata()
      if(error) actions.warn(error)
    },
    reset: (code: string) => {
      console.log(`auth: reset ${code}`)
      const [qdata] = createQuery({ query: resetPassword, variables: { code }})
      const { error } = qdata()
      if(error) actions.warn(error)
    },
    resend: (email: string) => {
      console.log(`auth: resend ${email}`)
      const [qdata] = createQuery({ query: resendCode, variables: { email }})
      const { error } = qdata()
      if(error) actions.warn(error)
    },
    follow: (slug: string, what: string) => {
      console.log(`follow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: fq, variables: { what, slug }})
      const { error } = qdata()
      if(error) actions.warn(error)
    },
    unfollow: (slug: string, what: string) => {
      console.log(`unfollow ${slug} from ${what}`)
      const [qdata] = createQuery({ query: ufq, variables: { what, slug }})
      const { error } = qdata()
      if(error) actions.warn(error)
    },
    more: () => {
      Object.keys(moreQueries).forEach((what: string) => {
        if(location.pathname.startsWith('/'+what)) {
          // const slug = location.pathname.replace(`/${what}/`, '').replace('/','')
          // FIXME
          // let variables: {[k:string]: { page: number; size: number }} = { page: (state.page + 1), size: state.size }
          // variables[what] = slug
          // const [qdata] = createQuery({ query: moreQueries[what], variables })
          // setState({ ...state, articles: qdata()})
        }
      })
    }
  }

  createEffect(() => {
    if(state.token) actions.getSession()
    // if(client.url === 'https://newapi.discours.io' && !topicsUpdated()) actions.topicsAll()
  })
  // WARNING: unknown type
  return <StoreContextProvider value={[state as unknown as CommonStore, actions]} children={props.children} />
}

export function useStore() {
  return useContext(StoreContext)
}
