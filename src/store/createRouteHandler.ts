import { createSignal, onCleanup, useTransition } from 'solid-js'

export default function createRouteHandler(init) {
  const [location, setLocation] = createSignal(window.location.hash.slice(2) || init);
    const [read, triggerParams] = createSignal();
    const [, start] = useTransition();
    const locationHandler = () => start(() => setLocation(window.location.hash.slice(2)))
  let params

  window.addEventListener('hashchange', locationHandler)
  onCleanup(() => window.removeEventListener('hashchange', locationHandler))

  return {
    location,
    match: (name, test) => {
      const loc = location().split('?')[0]
      const match = test.exec(loc)

      if (match) {
        params = { params: match.slice(1), routeName: name }
        triggerParams()
      }

      return Boolean(match)
    },
    getParams: () => (read(), params)
  }
}
