import { hydrate } from "solid-js/web";
import { StartClient } from "solid-start/entry-client";
import { Provider } from './store'

hydrate(
  () => (
    <Provider>
      <StartClient />
    </Provider>
  ),
  document
)
