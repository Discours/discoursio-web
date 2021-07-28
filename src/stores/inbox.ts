import { Writable, writable } from 'svelte/store'
import type { Message } from '../graphql/codegen'

export const chats: Writable<Array<Message[]>> = writable([])
