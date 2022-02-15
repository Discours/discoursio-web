<script lang="ts">
  import { onMount } from 'svelte'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import * as Y from 'yjs'

  import {
    body,
    db,
    loading,
    p2p,
    room,
    webrtc,
    ydoc
  } from '$lib/stores/editor'

  export let password: string

  const dbSynced = () => {
    const up = $db.doc.getXmlFragment($room + '-body')
    if ($body !== up && up.length > 0) {
      $body = up
      console.log('p2p: body updated')
    }
    $loading = false
  }

  const p2pDocUpdate = (update) => {
    $loading = true
    console.log('p2p: updating the doc')
    Y.logUpdate(update)
    $loading = false
  }

  onMount(() => {
    // TODO: generate room name from window.location
    $room =
      window.location.hostname +
      (window.location.pathname.length === 1 ? '' : window.location.pathname)
    console.log('p2p: room is ' + $room)
    // check if there is a pre-configured password
    if (password) $webrtc.password = password
    // init db
    $db = new IndexeddbPersistence($room, $ydoc)
    console.log('p2p: indexed db persistence connected')
    // connect p2p
    $p2p.connect()
    console.log('p2p: connected')
    // sync db
    $db.on('synced', dbSynced)
    $p2p.doc.on('update', p2pDocUpdate)
  })
</script>

{#if $p2p && $p2p.room}
  <small class="p-1 rounded border border-gray-400 room">
    {$p2p.roomName}
  </small>
{/if}

<style>
  .room {
    position: fixed;
    bottom: 0;
    background-color: plum;
    color: white;
    text-shadow: 1px 1px rebeccapurple;
  }
</style>
