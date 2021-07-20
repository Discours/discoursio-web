import { writable, Writable } from 'svelte/store'
import type { SvelteComponent } from 'svelte'
import { createRouteStore } from 'svelte-store-router'

export const route = createRouteStore({
  delay: 100,
  queryClean: true,
  fragmentClean: true,
})

export interface Route {
  component: SvelteComponent
  caption: string
  icon: SvelteComponent
  public?: boolean
}

export const pages: Writable<Array<Route>> = writable([])
