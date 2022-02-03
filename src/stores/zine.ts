import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'

import type { Community, Shout, Topic, User } from '$lib/codegen'

export const authorslist: Writable<User[]> = writable([])
export const communitieslist: Writable<Community[]> = writable([])
export const topicslist: Writable<Topic[]> = writable([])
export const shouts: Writable<{ [slug: string]: Shout }> = writable({})
export const topics: Writable<{ [slug: string]: Topic }> = writable({})
export const authors: Writable<{ [slug: string]: Partial<User> }> = writable({})
export const communities: Writable<{ [slug: string]: Community }> = writable({})
export const filterTopic: Writable<string> = writable('')
export const subscribedTopics: Writable<string[]> = writable([])
export const subscribedAuthors: Writable<string[]> = writable([])

export const subscribedShouts: Writable<Shout[]> = writable([])
export const reviewedShouts: Writable<Shout[]> = writable([])
export const recents: Writable<Shout[]> = writable([])
export const recentCommented: Writable<Shout[]> = writable([])
export const candidates: Writable<Shout[]> = writable([])
export const topMonth: Writable<Shout[]> = writable([])
export const topOverall: Writable<Shout[]> = writable([])
export const topViewed: Writable<Shout[]> = writable([])
