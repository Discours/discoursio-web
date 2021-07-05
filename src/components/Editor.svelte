<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Collaboration from '@tiptap/extension-collaboration'
  import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
  import * as Y from 'yjs'
  import { WebsocketProvider } from 'y-websocket'
  import { IndexeddbPersistence } from 'y-indexeddb'

  const DEFAULT_ROOM = 'discours.io/test'
  const SERVER_URL = 'ws://127.0.0.1:1234' // "ws://publicws.discours.io"

  let element
  let editor
  const ydoc = new Y.Doc()
  const provider = new WebsocketProvider(SERVER_URL, DEFAULT_ROOM, ydoc)

  onDestroy(() => editor && editor.destroy())

  onMount(() => {
    editor = new Editor({
      element,
      extensions: [Collaboration, CollaborationCursor, StarterKit],
      content: '<p>Hello World! 🌍️ </p>',
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor
      },
    })
    // Store the Y document in the browser
    new IndexeddbPersistence(DEFAULT_ROOM, ydoc)
    provider.connect()
  })
</script>

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
