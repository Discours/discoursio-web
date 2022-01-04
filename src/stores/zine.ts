/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { User, Topic, Community, Shout } from '../lib/codegen'

export const authorslist: Writable<User[]> = writable([])
authorslist.subscribe((tl) => {
	if (tl) console.debug('store: authorslist updated with ' + tl.length)
})
export const communitieslist: Writable<Community[]> = writable([])
export const shoutslist: Writable<Shout[]> = writable([])
shoutslist.subscribe((tl) => {
	if (tl) console.debug('store: shoutslist updated with ' + tl.length)
})
export const topicslist: Writable<Topic[]> = writable([])
topicslist.subscribe((tl) => {
	if (tl) console.debug('store: topicslist updated with ' + tl.length)
})
export const shouts: Writable<{ [slug: string]: Shout }> = writable({})
export const topics: Writable<{ [slug: string]: Topic }> = writable({})
export const authors: Writable<{ [slug: string]: User }> = writable({})
export const communities: Writable<{ [slug: string]: Community }> = writable({})

// TODO: hash navigation
export const filterTopic: Writable<string> = writable('')

export const subscribedTopics: Writable<string[]> = writable([])
subscribedTopics.subscribe((tl) =>
	console.debug('store: subscribedTopics updated with ' + tl.length)
)
export const subscribedAuthors: Writable<string[]> = writable([])
subscribedAuthors.subscribe((tl) => {
	if (tl) console.debug('store: subscribedAuthors updated with ' + tl.length)
})
