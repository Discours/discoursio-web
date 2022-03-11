import { hydrate } from 'solid-js/web'
import { StartClient } from 'solid-start/components'
import { Provider } from './store'

hydrate(
  () => (
    <Provider>
      <StartClient />
    </Provider>
  ),
  document
)
