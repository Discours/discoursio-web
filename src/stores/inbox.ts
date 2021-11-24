import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
import type { Message } from '../lib/codegen'

export const chats: Writable<Array<Message[]>> = writable([])
export const messages: Writable<{ [key: string]: Message }> = writable({})
export const messageslist: Writable<Array<Message>> = writable([])
