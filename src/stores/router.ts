import { Writable, writable } from 'svelte/store'
import type { SvelteComponent } from 'svelte'

export interface Route {
  component: SvelteComponent
  caption?: string
  public?: boolean
}

type Routes = {
  [key: string]: Route
}

export const pages: Writable<Routes> = writable({})
