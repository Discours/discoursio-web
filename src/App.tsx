import './app.scss'
import { createMemo, Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import Footer from './components/Discours/Footer'
import { StoreProvider as CommonStoreProvider } from './context/index'
import { AuthStoreProvider, useAuth } from './context/auth'
import { preventSmoothScrollOnTabbing } from './utils'
import { createClient, Provider as GraphqlProvider } from 'solid-urql'
import { baseUrl, createOptions } from './graphql/client'
import { ZineStateProvider } from './context/zine'

export const App = () => {
  const Routes = useRoutes(routes)
  preventSmoothScrollOnTabbing()
  const [authState, {}] = useAuth()
  const client = createMemo(() => (!authState.authorized) ?
      createClient({ url: baseUrl }) : createClient(createOptions(authState.token)))
  return (
    <Router>
      <GraphqlProvider value={client()}>
        <CommonStoreProvider>
          <AuthStoreProvider client={client()}>
            <ZineStateProvider client={client()}>
              <Header />
              {/* two div wrappers to make page animation work and performant */}
              <main class='main-content'>
                {/* <TransitionRoutes> */}
                <Suspense>
                  <Routes />
                </Suspense>
                {/* </TransitionRoutes> */}
              </main>
              <Footer />
            </ZineStateProvider>
          </AuthStoreProvider>
        </CommonStoreProvider>
      </GraphqlProvider>
    </Router>
  )
}
