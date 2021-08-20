import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Shout, User, Topic } from '../graphql/codegen'

export const shouts: Writable<{ [key: string]: Shout }> = writable()
export const topics: Writable<Topic[]> = writable()
export const authors: Writable<{ [uid: string]: User }> = writable({})
export const currentTopic: Writable<string> = writable()