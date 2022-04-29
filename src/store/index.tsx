/* eslint-disable solid/reactivity */
// see https://github.com/joshwilsonvu/eslint-plugin-solid/issues/18
import { Accessor, createContext, createSignal, onMount, useContext, createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import mySession from '../graphql/q/my-session'
import { createQuery, CreateQueryState } from 'solid-urql'
import signCheck from '../graphql/q/sign-check'
import signUp from '../graphql/q/sign-up'
import signOut from '../graphql/q/sign-out'
import { Topic, User } from '../graphql/types.gen'
import signIn from '../graphql/q/sign-in'
import topicsAll from '../graphql/q/topics-all'
import { client } from '../graphql/client'
import mySubscribed from '../graphql/q/my-subscribed'

type ModalType = '' | 'auth' | 'subscribe'
type WarnKind = 'error' | 'warn' | 'info'

export interface Warning {
  body: string
  kind: WarnKind
  seen?: boolean
}

interface Subscriber {
  subscriptions?: {
    authors?: string[]
    topics?: string[]
    communities?: string[]
  }
}

interface CommonStore {
  readonly topics: { [key: string]: Topic }
  readonly currentUser: Partial<User>
  readonly loadingTopics: boolean
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
  session: {} as Partial<User>,
  handshaking: false,
  warnings: [] as Warning[],
  modal: '' as ModalType
}

const StoreContext = createContext<[CommonStore, any]>([initState as CommonStore, {}])
const StoreContextProvider = StoreContext.Provider

export function StoreProvider(props: { children: any }) {
  const [loggedIn, setLoggedIn] = createSignal(false)
  let sessionData: Accessor<any>
  let topicsData: Accessor<any>
  let topicsState: Accessor<CreateQueryState<any, object>> | (() => { (): any; new (): any; fetching: any })
  const [subs] = createQuery({ query: mySubscribed })
  const [state, setState] = createStore({
    get topicsSubscribed() {
      return subs().topics
    },
    get authorsSubscribed() {
      return subs().authors
    },
    get loadingTopics() {
      return topicsState().fetching
    },
    get currentUser() {
      return state.session
    },
    topics: [] as Topic[],
    page: 0,
    totalPagesCount: 0,
    token: '',
    appName: 'discours.io',
    session: {} as Partial<User>,
    handshaking: false,
    warnings: [] as Warning[],
    modal: '' as ModalType
  })

  const actions = {
    // warnings
    warn: (w: Warning) => setState({ warnings: [...state.warnings, w] }),
    unwarn: (index: number) => {
      let w: Warning = state.warnings[index]

      w.seen = true
      setState({ warnings: [...state.warnings, w] })
    },
    showModal: (name: ModalType) => setState({ ...state, modal: name }),
    hideModal: () => setState({ ...state, modal: '' }),
    // auth
    getSession: () => {
      setState({ ...state, token: localStorage.getItem('jwt') || '' })

      if (state.token) {
        // eslint-disable-next-line no-shadow
        const [sessionData] = createQuery({ query: mySession, variables: { token: state.token } })

        setState({ session: sessionData(), token: state.token, handshaking: false })
      }
    },
    signIn: (email: string, password: string) => {
      const [qdata] = createQuery({ query: signIn, variables: { email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ token, session: user, handshaking: false })

      setState({ ...state, warnings: [...state.warnings, error], handshaking: false })
      setLoggedIn(true)
    },
    signUp: (username: string, email: string, password: string) => {
      const [qdata] = createQuery({ query: signUp, variables: { username, email, password } })
      const { user, token, error } = qdata()

      if (!error) setState({ token, session: user, handshaking: false })

      setState({ ...state, warnings: [...state.warnings, error], handshaking: false })
      setLoggedIn(true)
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
    },
    forget: (email: string) => {
      console.log(`auth: forget ${email}`)
      // TODO: implement forget, reset, resend
      // const [qdata] = createQuery()
    },
    toggleAuthor: (slug: string) => {
      console.log(`toggle ${slug} author`)
      // TODO: implement
    },
    toggleTopic: (slug: string) => {
      console.log(`toggle ${slug} topic`)
      // TODO: implement
    }
  }

  onMount(() => {
    if (state.token) actions.getSession()

    if (state.topics === {}) {
      // eslint-disable-next-line no-shadow
      const [topicsData] = createQuery({ query: topicsAll })

      setState({ ...state, topics: topicsData() })
    }
  })

  return <StoreContextProvider value={[state as CommonStore, actions]} children={props.children} />
}

export function useStore() {
  return useContext(StoreContext)
}
