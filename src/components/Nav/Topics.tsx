import { For, createSignal } from 'solid-js'
import { useStore } from '../../store'

export default (props: { topics: string[] }) => {
  const [filterTopic, setFilterTopic] = createSignal()
  const [state] = useStore()

  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <For each={Array.from(props?.topics)}>
          {(t: string) => (
            <li class='item' classList={{ selected: filterTopic() === t }}>
              <a href={`/topic/${t}`} onClick={() => setFilterTopic(t || '')}>
                <span classList={{ transparent: filterTopic() !== t }}>#{state.topics[t].title}</span>
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}
