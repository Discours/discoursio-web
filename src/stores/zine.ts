import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout, User, Topic, Community } from '../graphql/codegen'
import shoutsMock from '../data/articles.json'
import authorsMock from '../data/authors.json'
import communitiesMock from '../data/communities.json'

export const shouts: Writable<{ [key: string]: Shout }> = writable()
export const topics: Writable<Topic[]> = writable()
export const authors: Writable<{ [uid: string]: User }> = writable({})
export const currentTopic: Writable<string> = writable('')
export const shoutlist: Writable<Shout[]> = writable(shoutsMock)
export const authorslist: Writable<User[]> = writable(authorsMock)
export const communitieslist: Writable<Community[]> = writable(communitiesMock)

export { shoutsMock, authorsMock, communitiesMock }
