import './app.scss'
import { Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import Footer from './components/Discours/Footer'
import { AppContextProvider } from './AppContext'
import { preventSmoothScrollOnTabbing } from './utils'
import { StoreProvider } from './store'
import { Provider as GraphqlProvider } from 'solid-urql'
import { useClient } from './graphql/client'
import { useStore } from './store'

export const App = () => {
  const Routes = useRoutes(routes)
  const client = useClient()
  preventSmoothScrollOnTabbing()
  const [{ token }] = useStore()

  if (token?.length) {
    let headers: { [key: string]: string } = { 'Content-Type': 'application/json' }

    headers.authorization = `Auth ${token}`
    client.fetchOptions = { headers }
  }

  return (
    <Router>
      <AppContextProvider>
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
      </AppContextProvider>
    </Router>
  )
}
