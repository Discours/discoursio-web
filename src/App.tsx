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
import { client } from './graphql/client'

export const App = () => {
  const Routes = useRoutes(routes)

  preventSmoothScrollOnTabbing()

  return (
    <main class='min-h-screen'>
      <Router>
        <AppContextProvider>
          <GraphqlProvider value={client}>
            <StoreProvider>
              <Header />
              {/* two div wrappers to make page animation work and performant */}
              <div id='main-content'>
                <div>
                  {/* <TransitionRoutes> */}
                  <Suspense>
                    <Routes />
                  </Suspense>
                  {/* </TransitionRoutes> */}
                </div>
              </div>
              <Footer />
            </StoreProvider>
          </GraphqlProvider>
        </AppContextProvider>
      </Router>
    </main>
  )
}
