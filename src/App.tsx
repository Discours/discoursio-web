import './app.scss'
import { createMemo, Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import Footer from './components/Discours/Footer'
import { StoreProvider as CommonStoreProvider } from './store/index'
import { AuthStoreProvider, useAuth } from './store/auth'
import { preventSmoothScrollOnTabbing } from './utils'
import { createClient, Provider as GraphqlProvider } from 'solid-urql'
import { baseUrl, createOptions } from './graphql/client'
import { ZineStoreProvider } from './store/zine'

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
            <ZineStoreProvider client={client()}>
              <Header />
              {/* two div wrappers to make page animation work and performant */}
              <div id='main-content'>
                {/* <TransitionRoutes> */}
                <Suspense>
                  <Routes />
                </Suspense>
                {/* </TransitionRoutes> */}
              </div>
              <Footer />
            </ZineStoreProvider>
          </AuthStoreProvider>
        </CommonStoreProvider>
      </GraphqlProvider>
    </Router>
  )
}
