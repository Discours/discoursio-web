<script lang="ts">
  import { onMount } from 'svelte'
  import * as Y from 'yjs'
  // import { WebrtcProvider } from 'y-webrtc'
  import { IndexeddbPersistence } from 'y-indexeddb'
  import { ydoc, p2p, db, room, collaborating } from '../stores/editor'
  import type { Shout } from '../graphql/codegen'
  import ProsemirrorEditor from 'prosemirror-svelte'
  import { createRichTextEditor } from 'prosemirror-svelte/state'
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo,
  } from 'y-prosemirror'
  import { keymap } from 'prosemirror-keymap'
  import { EditorState } from 'prosemirror-state'
  import { schema } from '../lib/editor-schema'

  let editorState
  let placeholder = 'Напишите что-нибудь'
  export let shout: Partial<Shout> = {
    slug: '',
    body: '',
    createdAt: new Date().toLocaleDateString('en-US'),
    updatedAt: new Date().toLocaleDateString('en-US'),
  }

  const handleChange = (ev) => {
    editorState = ev.detail.editorState
  }

  $: if (shout) {
    import('marked').then((imp) => {
      if (shout.old_id) {
        editorState = createRichTextEditor(shout.body)
      } else {
        const marked = imp.default
        editorState = createRichTextEditor(marked(shout.body))
      }
    })
  }

  $: if ($collaborating) {
    import('y-webrtc').then((imp) => {
      const { WebrtcProvider } = imp
      $p2p = new WebrtcProvider($room, $ydoc)
      $p2p.connect()
    })
  }

  onMount(async () => {
    $room = window.location.pathname
    $ydoc = new Y.Doc()
    editorState = EditorState.create({
      schema,
      plugins: [
        ySyncPlugin($ydoc.get('test', Y.XmlFragment)), // FIXME
        yCursorPlugin($p2p.awareness),
        yUndoPlugin(),
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo,
        }),
      ].concat({ schema }),
    })
    $db = new IndexeddbPersistence($room, $ydoc)
    $db.whenSynced.then(() => console.log('loaded data from indexed db'))
  })
</script>

<section>
  {#if $p2p}
    <div class="connected-counter">{$p2p.room.webrtcConns.size}</div>
    <p>Connected to {$p2p && $p2p.roomName}</p>
  {/if}
  <ProsemirrorEditor
    {placeholder}
    {editorState}
    on:change={handleChange}
    debounceChangeEventsInterval={500}
  />
  <button
    on:click={() => ($collaborating = !$collaborating)}
    value={($collaborating ? 'Отключить с' : 'С') + 'овместное редактирование'}
  />
</section>
