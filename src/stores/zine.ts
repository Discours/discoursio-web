import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout, User, Topic } from '../graphql/codegen'
import shoutsMock from '../data/articles.json'
import authorsMock from '../data/authors.json'

export const shouts: Writable<{ [key: string]: Shout }> = writable()
export const topics: Writable<Topic[]> = writable()
export const authors: Writable<{ [uid: string]: User }> = writable({})
export const currentTopic: Writable<string> = writable()
export const shoutlist: Writable<Shout[]> = writable(shoutsMock)
export const authorslist: Writable<Author[]> = writable(authorsMock)

export { shoutsMock, authorsMock }
