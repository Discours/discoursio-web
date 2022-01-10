import * as Y from 'yjs'
import type { WebrtcProvider } from 'y-webrtc'
import type { IndexeddbPersistence } from 'y-indexeddb'
import { writable, derived } from 'svelte/store'
import type { Writable, Readable } from 'svelte/store'
import { Awareness } from 'y-protocols/awareness.js'

export const room: Writable<string> = writable('discours')
export const ydoc = writable(new Y.Doc())
export const p2p: Writable<WebrtcProvider> = writable()
interface WebrtcOptions {
	signaling: string[]
	awareness: Awareness
	maxConns: number
	filterBcConns: boolean
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	peerOpts: any
	password: string
}

export const signaling = [
	// 'wss://signaling.discours.io',
	// 'wss://stun.l.google.com:19302',
	'wss://y-webrtc-signaling-eu.herokuapp.com',
	'wss://signaling.yjs.dev'
]
export const webrtc: Readable<WebrtcOptions> = derived(
	[ydoc],
	([$ydoc]): WebrtcOptions => {
		return {
			awareness: new Awareness($ydoc),
			filterBcConns: true,
			maxConns: 33,
			signaling,
			peerOpts: {},
			password: ''
		}
	}
)
export const body: Writable<Y.XmlFragment> = writable(new Y.XmlFragment())
export const db: Writable<IndexeddbPersistence> = writable()
export const loading: Writable<boolean> = writable(false)