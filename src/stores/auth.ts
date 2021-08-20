import type { Writable, Readable } from 'svelte/store'
import { writable, derived } from 'svelte/store'
import type { User } from '../graphql/codegen'
import { org } from './common'

// counted UI-related role states
export enum AS {
  GUEST = 1, // no account
  READER = 2, // logged in
  CRITIC = 3, // has comments with rating
  AUTHOR = 4, // with public shouts
  EXPERT = 5, // uses collaborative editing
  EDITOR = 6, // can approve publications
  OWNER = 7, // can edit org settings
  ADMIN = 8, // can manage all orgs
}
export const FACEBOOK_APP_ID = '1809443122683615'
export const VK_APP_ID = '7901964'
export const GOOGLE_APP_ID = ''
export const token: Writable<string> = writable()
export const session: Writable<User> = writable()
export const orgRole: Readable<AS> = derived(
  [org, session],
  ([$org, $session]) => {
    $session && console.log(`${$org} roles: ${$session.roles}`)
    return 8
  }
)

// ui form needs
export const auth: Writable<{
  email: string
  password: string
  remember: boolean
}> = writable({
  email: '',
  password: '',
  remember: false,
})
