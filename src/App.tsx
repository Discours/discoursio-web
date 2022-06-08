import './app.scss'
import { Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import Footer from './components/Discours/Footer'
import { StoreProvider } from './store/index'
import { preventSmoothScrollOnTabbing } from './utils'
import { Provider as GraphqlProvider } from 'solid-urql'
import { useClient } from './graphql/client'
import { useAuth } from './store/auth'

export const App = () => {
  const Routes = useRoutes(routes)
  const client = useClient()
  preventSmoothScrollOnTabbing()
  const [{ token }] = useAuth()

  if (token?.length) {
    let headers: { [key: string]: string } = { 'Content-Type': 'application/json' }
    headers.authorization = `Auth ${token}`
    client.fetchOptions = { headers }
  }

  return (
    <Router>
      <StoreProvider>
        <GraphqlProvider value={client}>
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
        </GraphqlProvider>
      </StoreProvider>
    </Router>
  )
}
