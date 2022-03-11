import { onMount } from 'solid-js'
import { For, Portal, Show } from 'solid-js/web'
import { useStore } from '~/store'
let store
let state

export default () => {
  onMount(() => {
    store = useStore()
    state = store[0]
  })

  return (
    <Show when={state?.notifications}>
      <Portal>
        <ul class='errors'>
          <For each={state.errors}>{(w: string) => <li>{w}</li>}</For>
        </ul>
        <ul class='notifications'>
          <For each={state.notifications}>{(n: string) => <li>{n}</li>}</For>
        </ul>
      </Portal>
    </Show>
  )
}
