import { render } from 'solid-js/web'
import App from './App'
import { Provider } from 'solid-urql'
import { createClient } from 'solid-urql'
import { clientOptions } from './store/graphql/client'

const client = createClient(clientOptions)

render(
  () => (
    <Provider value={client}>
      <App />
    </Provider>
  ),
  document.body
)
