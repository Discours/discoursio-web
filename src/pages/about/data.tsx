import { RouteDataFunc } from "solid-app-router"
import { createSignal } from "solid-js"

export const AbouteData: RouteDataFunc = (args) => {
    const [state, setState] = createSignal()
    import(`${args.params.slug}.mdx`).then(setState)
    return {
      get slug() {
        return args.params.slug
      },
      get body() {
          return state()
      }
    }
}