<script>
  import { onMount, onDestroy } from 'svelte'
  import { Editor } from '@tiptap/core'
  import StarterKit from '@tiptap/starter-kit'
  import Collaboration from '@tiptap/extension-collaboration'
  import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
  import * as Y from 'yjs'
  import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'

  const DEFAULT_ROOM = 'discours.io/test'
  const options = {
    signaling: [
      'wss://signaling.yjs.dev',
      'wss://y-webrtc-signaling-eu.herokuapp.com',
      // 'wss://tracker.openwebtorrent.com',
      // 'wss://tracker.novage.com.ua:443/announce',
      // "wss://signaling.discours.io"
    ],
  }
  let element
  let editor
  const ydoc = new Y.Doc()
  const provider = new WebrtcProvider(DEFAULT_ROOM, ydoc, options)

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

<div class="connected-counter">
  {Object.keys(provider.room.doc)}
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
