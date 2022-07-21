import { RouteDataFunc, useRouteData } from "solid-app-router"
import { createContext, createMemo, useContext } from "solid-js"

export interface AboutState {
    [key:string]: any
}

export const AboutContext = createContext([{} as AboutState, {}])


export const AboutStateHandler: RouteDataFunc = (): AboutState => {
    // TODO: implement about data preprocessing
    return {}
}

export function useAbout() {
    return useContext(AboutContext)
  }

export default () => {
    const data = useRouteData<AboutState>()
    const slug = createMemo<string>(() => data.params?.slug)
    let r 
    try { r = import(slug()) }
    catch(_) { r = import(slug() + '.mdx') }
    return r
}

