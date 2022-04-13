import { For, Show, createEffect, createSignal, onCleanup } from 'solid-js'
import { unwrap } from 'solid-js/store'
import { undo, redo } from 'prosemirror-history'
import { File, useState /*, Config, PrettierConfig */ } from './store'
// import { isTauri, isMac, alt, mod, WEB_URL /*, VERSION_URL*/ } from '../env'
// import * as remote from '../remote'
import { isEmpty /*, isInitialized*/ } from './prosemirror/state'
import { Styled } from './Layout'
import './Sidebar.scss'
import { EditorState } from 'prosemirror-state'
import { serialize } from './prosemirror/markdown'
import { isMac, mod } from './prosemirror/context'

const copy = async (text: string): Promise<void> => navigator.clipboard.writeText(text)
const copyAllAsMarkdown = async (state: EditorState): Promise<void> =>
  navigator.clipboard.writeText(serialize(state))

const Off = (props: any) => <div class='sidebar-off'>{props.children}</div>

const Label = (props: Styled) => <h3 class='sidebar-label'>{props.children}</h3>

const Link = (
  props: Styled & { withMargin?: boolean; disabled?: boolean; title?: string; className?: string }
) => (
  <button
    class={`sidebar-link${props.className ? ` ${props.className}` : ''}`}
    style={{ marginBottom: props.withMargin ? '10px' : '' }}
    onClick={props.onClick}
    disabled={props.disabled}
    title={props.title}
    data-testid={props['data-testid']}
  >
    {props.children}
  </button>
)

export default () => {
  const [store, ctrl] = useState()
  const [lastAction, setLastAction] = createSignal<string | undefined>()
  const toggleTheme = () => {
    document.body.classList.toggle('dark')
    ctrl.updateConfig({ theme: document.body.className })
  }
  // eslint-disable-next-line no-confusing-arrow
  const collabText = () => (store.collab?.started ? 'Stop' : store.collab?.error ? 'Restart 🚨' : 'Start')
  const editorView = () => unwrap(store.editorView)
  const onToggleMarkdown = () => ctrl.toggleMarkdown()
  const onOpenFile = (file: File) => ctrl.openFile(unwrap(file))
  const collabUsers = () => store.collab?.y?.provider.awareness.meta.size ?? 0
  const onUndo = () => undo(editorView().state, editorView().dispatch)
  const onRedo = () => redo(editorView().state, editorView().dispatch)
  const onCopyAllAsMd = () => copyAllAsMarkdown(editorView().state).then(() => setLastAction('copy-md'))
  const onToggleAlwaysOnTop = () => ctrl.updateConfig({ alwaysOnTop: !store.config.alwaysOnTop })
  const onToggleFullscreen = () => ctrl.setFullscreen(!store.fullscreen)
  const onNew = () => ctrl.newFile()
  const onDiscard = () => ctrl.discard()
  /*
  const onSaveAs = async () => {
    const path = await remote.save(editorView().state)

    if (path) ctrl.updatePath(path)
  }
  */
  const onCollab = () => {
    const state = unwrap(store)

    store.collab?.started ? ctrl.stopCollab(state) : ctrl.startCollab(state)
  }

  const onCopyCollabLink = () => {
    copy(`https://${window?.location.hostname}/create/${store.collab?.room}`).then(() => {
      editorView().focus()
      setLastAction('copy-collab-link')
    })
  }
  const FileLink = (p: { file: File }) => {
    const length = 100
    let content = ''
    const getContent = (node: any) => {
      if (node.text) {
        content += node.text
      }

      if (content.length > length) {
        content = `${content.substring(0, length)}...`

        return content
      }

      if (node.content) {
        for (const child of node.content) {
          if (content.length >= length) {
            break
          }

          content = getContent(child)
        }
      }

      return content
    }

    // eslint-disable-next-line no-confusing-arrow
    const text = () =>
      p.file.path ? p.file.path.substring(p.file.path.length - length) : getContent(p.file.text?.doc)

    return (
      // eslint-disable-next-line solid/no-react-specific-props
      <Link className='file' onClick={() => onOpenFile(p.file)} data-testid='open'>
        {text()} {p.file.path && '📎'}
      </Link>
    )
  }

  const Keys = (props: { keys: string[] }) => (
    <span>
      <For each={props.keys}>{(k: string) => <i>{k}</i>}</For>
    </span>
  )

  createEffect(() => {
    setLastAction(undefined)
  }, store.lastModified)

  createEffect(() => {
    if (!lastAction()) return

    const id = setTimeout(() => {
      setLastAction(undefined)
    }, 1000)

    onCleanup(() => clearTimeout(id))
  })

  return (
    <div class='sidebar-container'>
      <Off onClick={() => editorView().focus()} data-tauri-drag-region='true'>
        <Show when={true}>
          <div>
            {
              <Show when={store.path}>
                {
                  <Label>
                    <i>({store.path?.substring(store.path.length - 24)})</i>
                  </Label>
                }
              </Show>
            }
            <Link>Пригласить соавторов</Link>
            <Link>Настройки публикации</Link>
            <Link>История правок</Link>

            <div class='theme-switcher'>
              Ночная тема
              <input type='checkbox' name='theme' id='theme' onClick={toggleTheme} />
              <label for='theme'>Ночная тема</label>
            </div>

            <Link onClick={onNew} data-testid='new'>
              New <Keys keys={[mod, 'n']} />
            </Link>
            <Link
              onClick={onDiscard}
              disabled={!store.path && store.files?.length === 0 && isEmpty(store.text)}
              data-testid='discard'
            >
              {store.path
                ? 'Close'
                : store.files?.length > 0 && isEmpty(store.text)
                ? 'Delete ⚠️'
                : 'Clear'}{' '}
              <Keys keys={[mod, 'w']} />
            </Link>

            <Link onClick={onUndo}>
              Undo <Keys keys={[mod, 'z']} />
            </Link>
            <Link onClick={onRedo}>
              Redo <Keys keys={[mod, ...(isMac ? ['Shift', 'z'] : ['y'])]} />
            </Link>

            <Link onClick={onToggleMarkdown} data-testid='markdown'>
              Markdown mode {store.markdown && '✅'} <Keys keys={[mod, 'm']} />
            </Link>
            <Link onClick={onCopyAllAsMd}>Copy all as MD {lastAction() === 'copy-md' && '📋'}</Link>
            <Show when={store.files?.length > 0}>
              <h4>Files:</h4>
              <p>
                <For each={store.files}>{(file) => <FileLink file={file} />}</For>
              </p>
            </Show>

            <Link onClick={onCollab} title={store.collab?.error ? 'Connection error' : ''}>
              Collab {collabText()}
            </Link>
            <Show when={collabUsers() > 0}>
              <Link onClick={onCopyCollabLink}>
                Copy Link {lastAction() === 'copy-collab-link' && '📋'}
              </Link>
              <span>
                {collabUsers()} {collabUsers() === 1 ? 'user' : 'users'} connected
              </span>
            </Show>
          </div>
        </Show>
      </Off>
    </div>
  )
}
