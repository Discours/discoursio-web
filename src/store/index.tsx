import { createContext, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import createAgent from './createAgent'
import createArticles from './createArticles'
import createAuth from './createAuth'
import createCommon from './createCommon'
import createComments from './createComments'
import createProfile from './createProfile'
import createRouteHandler from './createRouteHandler'

const StoreContext = createContext()
const StoreContextProvider = StoreContext.Provider

const RouterSolidContext = createContext()
const RouterContextProvider = RouterSolidContext.Provider

export function Provider(props) {
  let articles; let comments; let tags; let profile; let currentUser
  const router = createRouteHandler('');
    const [state, setState] = createStore({
      get articles() {
        return articles()
      },
      get comments() {
        return comments()
      },
      get tags() {
        return tags()
      },
      get profile() {
        return profile()
      },
      get currentUser() {
        return currentUser()
      },
      page: 0,
      totalPagesCount: 0,
      token: localStorage.getItem('jwt'),
      appName: 'discours.io'
    });
    const actions = {};
    const store = [state, actions];
    const agent = createAgent(store)

  articles = createArticles(agent, actions, state, setState)
  comments = createComments(agent, actions, state, setState)
  tags = createCommon(agent, actions, state, setState)
  profile = createProfile(agent, actions, state, setState)
  currentUser = createAuth(agent, actions, setState)

  return (
    <RouterContextProvider
      value={router}
      children={<StoreContextProvider value={store} children={props.children} />}
    />
  )
}

export function useStore() {
  return useContext(StoreContext)
}

export function useRouter() {
  return useContext(RouterSolidContext)
}
