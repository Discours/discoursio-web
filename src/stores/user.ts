import type { Writable } from 'svelte/store'
import { writable } from 'svelte/store'
import type { User } from '../lib/codegen'

// counted UI-related role states
export enum AS {
	GUEST = 1, // no account
	READER = 2, // logged in
	CRITIC = 3, // has comments with rating
	AUTHOR = 4, // with public shouts
	EXPERT = 5, // uses collaborative editing
	EDITOR = 6, // can approve publications
	OWNER = 7, // can edit org settings
	ADMIN = 8 // can manage all communities
}

interface Role {
	community: number
	level: AS
}

export interface Notice {
	type: string
	text: string
	lead?: string
	state: string
	ts: Date
}

export const FACEBOOK_APP_ID = '1809443122683615'
export const VK_APP_ID = '7901964'
export const GOOGLE_APP_ID = ''
export const token: Writable<string> = writable('')
export const session: Writable<Partial<User>> = writable({})
export const roles: Writable<Role[]> = writable([])
export const notices: Writable<Notice[]> = writable([])
