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

  let webrtc, db, ydoc

  const synced = () => {
      console.log('loaded data from indexed db')
    }

  onMount(() => {
    ydoc = new Y.Doc()
    webrtc = new WebrtcProvider(DEFAULT_ROOM, ydoc)
    // this allows you to instantly get the (cached) documents data
    db = new IndexeddbPersistence('count-demo', ydoc)
    db.whenSynced.then(synced)
    webrtc.signalingUrls = signalingUrls
    console.debug(ydoc)
  })
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>

<p>Connected to {webrtc && webrtc.roomName}</p>
