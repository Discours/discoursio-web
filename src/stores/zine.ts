import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { User, Topic, Community } from '../graphql/codegen'
import type { Shout } from '../lib/types'

export const topMonth: Writable<Shout[]> = writable([])
export const topOverall: Writable<Shout[]> = writable([])
export const recents: Writable<Array<Shout[]>> = writable([])

export const authorslist: Writable<Array<Partial<User>>> = writable([])
export const communitieslist: Writable<Array<Community | Partial<Community>>> =
	writable([])
export const shoutslist: Writable<Array<Shout | Partial<Shout>>> = writable([])
export const topicslist: Writable<Topic[]> = writable([])

export const shouts: Writable<{ [slug: string]: Shout }> = writable({})
export const topics: Writable<{ [slug: string]: Topic }> = writable({})
export const authors: Writable<{ [slug: string]: User | Partial<User> }> =
	writable({})
export const communities: Writable<{ [slug: string]: Community }> = writable({})
export const comments: Writable<{
	[slug: string]: Array<Comment | Partial<Comment>>
}> = writable({})

// hash navigation
export const filterTopic: Writable<string> = writable('')
