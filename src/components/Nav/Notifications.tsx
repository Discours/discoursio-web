import { For, Portal, Show } from 'solid-js/web'
import { useStore, Warning } from '../../store'
export default () => {
  const [state] = useStore()
  const notSeen = () => state.warnings?.filter((n: Warning) => !n.seen)
  return (
    <Show when={notSeen()}>
      <Portal>
        <ul class='warns'>
          <For each={state.warnings}>{(w: Warning) => <li>{w.body}</li>}</For>
        </ul>
      </Portal>
    </Show>
  )
}
