/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { User, Topic, Community, Comment } from '../graphql/codegen'
import type { Shout } from '../lib/types'

export const topMonth: Writable<Shout[]> = writable([])
export const topOverall: Writable<Shout[]> = writable([])
export const recents: Writable<Shout[]> = writable([])

export const authorslist: Writable<User[]> = writable([])
export const communitieslist: Writable<Community[]> = writable([])
export const shoutslist: Writable<Shout[]> = writable([])
export const topicslist: Writable<Topic[]> = writable([])

export const shouts: Writable<{ [slug: string]: Shout }> = writable({})
export const topics: Writable<{ [slug: string]: Topic }> = writable({})
export const authors: Writable<{ [slug: string]: User }> = writable({})
export const communities: Writable<{ [slug: string]: Community }> = writable({})
export const comments: Writable<{ [slug: string]: Comment[] }> = writable({})

// TODO: hash navigation
export const filterTopic: Writable<string> = writable('')
