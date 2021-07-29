<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Collaboration from '@tiptap/extension-collaboration'
  import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import type { Shout } from '../graphql/codegen'
  import { editorAccept } from '../graphql/queries'

  const DEFAULT_ROOM = 'discours.io/demo'
  const ydoc = new Y.Doc()
  const provider = new WebrtcProvider(DEFAULT_ROOM, ydoc)
  provider.signalingUrls = [
    'wss://signaling.discours.io',
    'wss://y-webrtc-signaling-eu.herokuapp.com'
  ]
  console.log(provider)
  console.log(ydoc)
  let element
  let editor

  export let shout: Shout = {
    id: 0,
    slug: '',
    author: 0,
    body: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  onDestroy(() => editor && editor.destroy())

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [Collaboration, CollaborationCursor, StarterKit],
      content: shout.body,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
    // Store the Y document in the browser
    new IndexeddbPersistence(DEFAULT_ROOM, ydoc)
    provider.connect()
    console.log(provider)
    // Object.keys(provider.room.doc)
  })
</script>

<div class="connected-counter">
  {'0'}
</div>
{#if editor}
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    class:active={editor.isActive('heading', { level: 1 })}
  >
    H1
  </button>
  <button
    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
    class:active={editor.isActive('heading', { level: 2 })}
  >
    H2
  </button>
  <button
    on:click={() => editor.chain().focus().setParagraph().run()}
    class:active={editor.isActive('paragraph')}
  >
    P
  </button>
{/if}

<div bind:this={element} />

<style>
  button.active {
    background: black;
    color: white;
  }
</style>
