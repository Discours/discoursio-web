import './app.scss'
import { Suspense } from 'solid-js'
import { useRoutes, Router } from 'solid-app-router'
import { routes } from './routes'
import Header from './components/Nav/Header'
import { AppContextProvider } from './AppContext'
import { preventSmoothScrollOnTabbing } from './utils'
import Footer from './components/Discours/Footer'
import { StoreProvider } from './store'

export const App = () => {
  const Routes = useRoutes(routes)

  preventSmoothScrollOnTabbing()

  return (
    <main class='min-h-screen'>
      <Router>
        <AppContextProvider>
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
        </AppContextProvider>
      </Router>
    </main>
  )
}
