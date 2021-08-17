<script>
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import { onMount } from 'svelte'

  const DEFAULT_ROOM = 'discours.io/demo'
  const signalingUrls = [
    'wss://signaling.discours.io',
    'wss://y-webrtc-signaling-eu.herokuapp.com',
  ]

  let provider, ydoc

  onMount(() => {
    ydoc = new Y.Doc()
    provider = new WebrtcProvider(DEFAULT_ROOM, ydoc)
    provider.signalingUrls = signalingUrls
    console.debug(ydoc)
  })
</script>

<h1>Welcome to SvelteKit</h1>
<p>Room: {provider && provider.roomName}</p>
