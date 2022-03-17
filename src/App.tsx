import { lazy, createSignal, createComputed, Suspense, Match, Show, Switch } from 'solid-js'
import { useStore, useRouter } from './store'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Article from './pages/Article'
import Profile from './pages/Profile'
import Editor from './pages/Editor'
import './app.scss'

const Settings = lazy(() => import('./pages/Settings')),
  Auth = lazy(() => import('./pages/Auth'))

export default () => {
  const [store, user] = useStore()
  const { pullUser } = user
  const [appLoaded, setAppLoaded] = createSignal(false)
  const { match, getParams } = useRouter()

  if (!store.token) setAppLoaded(true)
  else {
    pullUser()
    createComputed(() => store.currentUser && setAppLoaded(true))
  }

  return (
    <>
      <NavBar />
      <Show when={appLoaded()} children={0}>
        <Suspense fallback={<div class='container'>Loading...</div>} children={0}>
          <Switch children={0}>
            <Match when={match('editor', /^editor\/?(.*)/)} children={0}>
              <Editor {...getParams()} />
            </Match>
            <Match when={match('settings', /^settings/)} children={0}>
              <Settings />
            </Match>
            <Match when={match('login', /^login/)} children={0}>
              <Auth />
            </Match>
            <Match when={match('register', /^register/)} children={0}>
              <Auth />
            </Match>
            <Match when={match('article', /^article\/(.*)/)} children={0}>
              <Article {...getParams()} />
            </Match>
            <Match when={match('profile', /^@([^/]*)\/?(favorites)?/)} children={0}>
              <Profile {...getParams()} />
            </Match>
            <Match when={match('', /^#?$/)} children={0}>
              <Home />
            </Match>
          </Switch>
        </Suspense>
      </Show>
    </>
  )
}
