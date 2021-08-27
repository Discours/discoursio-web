import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout, User, Topic, Community } from '../graphql/codegen'
import shoutsData from '../data/articles.json'
import authorsData from '../data/authors.json'
import communitiesData from '../data/communities.json'
import topicsData from '../data/topics.json'

export const authorslist: Writable<Partial<User>[]> = writable(authorsData)
export const communitieslist: Writable<Partial<Community>[]> = writable(communitiesData)
export const shoutslist: Writable<Array<Partial<Shout>>> = writable(shoutsData)
export const topicslist: Writable<Topic[]> = writable(topicsData)

export const shouts: Writable<{ [slug: string]: Partial<Shout> }> = writable({})
export const topics: Writable<{ [slug: string]: Partial<Topic> }> = writable({})
export const authors: Writable<{ [slug: string]: Partial<User> }> = writable({})
export const communities: Writable<{ [slug: string]: Partial<Community> }> = writable({})

// hash navigation
export const filterTopic: Writable<string> = writable('')
