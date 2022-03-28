import { createSignal, onCleanup, onMount, useTransition } from 'solid-js'

export default function createRouteHandler(init) {
  const [location, setLocation] = createSignal(window.location.hash.slice(2) || init);
  const [read, triggerParams] = createSignal();
  let params

  onMount(() => {
    const [, start] = useTransition()
    const locationHandler = () => start(() => setLocation(window.location.hash.slice(2)))

    window.addEventListener('hashchange', locationHandler)
    onCleanup(() => window.removeEventListener('hashchange', locationHandler))
  })

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
    getParams() {
      return (read(), params)
    }
  }
}
