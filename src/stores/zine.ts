import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout } from '../graphql/codegen'
import shoutsData from '../../static/shouts.json'

export const shouts: Writable<{[key: string]: Shout}> = writable(shoutsData)
