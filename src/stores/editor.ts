import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'
// import type { Proposal } from '../graphql/codegen'
import type * as Y from 'yjs'
import type { WebrtcProvider } from 'y-webrtc'
import type { IndexeddbPersistence } from 'y-indexeddb'

export const signaling: Writable<string[]> = writable([
	'https://signaling.discours.io',
	'https://y-webrtc-signaling-eu.herokuapp.com',
])
export const ydoc: Writable<Y.Doc> = writable()
export const room: Writable<string> = writable()
export const p2p: Writable<WebrtcProvider> = writable()
export const db: Writable<IndexeddbPersistence> = writable()
export const collaborating: Writable<boolean> = writable(false)
