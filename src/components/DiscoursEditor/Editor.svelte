<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import './custom.css'
  import { EditorView } from 'prosemirror-view'
  import { EditorState } from 'prosemirror-state'
  import { schema } from 'prosemirror-markdown'
  import { setup } from './setup'
  import { keymap } from 'prosemirror-keymap'
  import type { XmlFragment } from 'yjs'
  import {
    ySyncPlugin,
    yCursorPlugin,
    yUndoPlugin,
    undo,
    redo
  } from 'y-prosemirror'
  import { webrtc, p2p as conn, ydoc, room } from '../../stores/editor'
  import P2PConnect from './P2P.svelte'
  import { WebrtcProvider } from 'y-webrtc'

  export let body: XmlFragment
  export let collab: boolean
  let element: HTMLDivElement = undefined
  let state: EditorState = undefined
  let plugins = []
  let view: EditorView = undefined

  $: if (collab) {
    console.log('editor: p2p collab mode')
    $conn = new WebrtcProvider($room, $ydoc, $webrtc)
  }

  $: if ($conn && $conn.awareness) {
    console.log('p2p: webrtc provider initialized')
    plugins = [
      ySyncPlugin(body),
      yCursorPlugin($conn.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      })
    ].concat(setup({ schema }))
    view.updateState(EditorState.create({ schema, plugins }))
  }

  onMount(() => {
    let doc
    if (!collab) {
      doc = body.doc
      plugins = [
        keymap({
          'Mod-z': undo,
          'Mod-y': redo,
          'Mod-Shift-z': redo
        })
      ].concat(setup({ schema }))
    }
    state = EditorState.create(
      collab ? { schema, plugins } : { schema, plugins, doc }
    )
    view = new EditorView(element, { state })
    view.focus()
    document.querySelector('.ProseMirror-menubar').setAttribute('style', '')
  })

  onDestroy(() => view && view.destroy())
</script>

{#if collab}<P2PConnect password={$webrtc.password} />{/if}
<div class="editor" transition:fade bind:this={element} />

<style>
  .editor {
    justify-content: left;
    align-items: left;
  }
</style>
