import './custom.css'
import { keymap } from 'prosemirror-keymap'
import { schema } from 'prosemirror-markdown'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Show, createSignal, onCleanup, onMount } from 'solid-js'
import { Doc } from 'yjs'
import { redo, undo, yCursorPlugin, ySyncPlugin, yUndoPlugin } from 'y-prosemirror'
import { setup } from './setup'
import P2P from './P2P'

let element: HTMLDivElement
let state: EditorState
let view: EditorView

export default (props) => {
  const [ydoc, setYdoc] = createSignal(new Doc())
  const [plugins, setPlugins] = createSignal(
    [
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo
      })
    ].concat(setup({ schema }))
  )

  onMount(() => {
    state = EditorState.create({ schema, plugins: plugins(), doc: props.body.doc })
    view = new EditorView(element, { state })
    view.focus()
    document.querySelector('.ProseMirror-menubar').setAttribute('style', '')
  })

  onCleanup(() => view && view.destroy())

  const onConnected = async (conn) => {
    setPlugins([ySyncPlugin(props.body), yCursorPlugin(conn.awareness), yUndoPlugin(), ...plugins()])
    view.updateState(EditorState.create({ schema, plugins: plugins() }))
  }

  const submit = () => {
    // TODO: some button to trig article update
    props.onSubmit()
  }

  return (
    <>
      <Show when={props.collab}>
        <P2P body={props.body} ydoc={ydoc()} onConnected={onConnected} />
      </Show>
      <div class='editor' ref={element}></div>
    </>
  )
}
