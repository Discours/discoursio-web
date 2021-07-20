import { Writable, writable } from 'svelte/store'
import type { User } from '../graphql/codegen'

export const token: Writable<string> = writable('')
export const session: Writable<User> = writable()
