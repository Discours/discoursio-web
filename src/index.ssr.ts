/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import App from './App.ssr.svelte'

const app = new App({
  target: document.body,
  hydrate: true,
})

const render = (props) => app.render(props)

export default { render }
