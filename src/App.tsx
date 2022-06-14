import './app.scss'
import { createMemo, Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import Footer from './components/Discours/Footer'
import { StoreProvider } from './store/index'
import { preventSmoothScrollOnTabbing } from './utils'
import { createClient, Provider as GraphqlProvider } from 'solid-urql'
import { useAuth } from './store/auth'
import { baseUrl, createOptions } from './graphql/client'

export const App = () => {
  const Routes = useRoutes(routes)
  preventSmoothScrollOnTabbing()
  const [authState, {}] = useAuth()
  const client = createMemo(() => {
    if(!authState.authorized) return createClient({ url: baseUrl })
    else return createClient(createOptions(authState.token))
  })
  return (
    <Router>
      <GraphqlProvider value={client()}>
        <StoreProvider>
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
        </StoreProvider>
      </GraphqlProvider>
    </Router>
  )
}
