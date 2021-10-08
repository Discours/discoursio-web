import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout, User, Topic, Community } from '../graphql/codegen'

export const authorslist: Writable<Partial<User>[]> = writable([])
export const communitieslist: Writable<Partial<Community>[]> = writable([])
export const shoutslist: Writable<Array<Shout | Partial<Shout>>> = writable([])
export const topicslist: Writable<Topic[]> = writable([])

export const shouts: Writable<{ [slug: string]: Partial<Shout> }> = writable({})
export const topics: Writable<{ [slug: string]: Partial<Topic> }> = writable({})
export const authors: Writable<{ [slug: string]: Partial<User> }> = writable({})
export const communities: Writable<{ [slug: string]: Partial<Community> }> = writable({})

// hash navigation
export const filterTopic: Writable<string> = writable('')
