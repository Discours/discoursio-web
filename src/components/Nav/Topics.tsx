import { For, createSignal, Show } from 'solid-js'
import { Topic } from '../../graphql/types.gen'
import './Topics.scss'

export default (props: any) => {
  const [filterTopic, setFilterTopic] = createSignal()
  console.debug(props)
  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <Show when={props?.topics}>
          <For each={Array.from(props.topics as Topic[])}>
            {(t: Topic) => (
              <li class='item' classList={{ selected: filterTopic() === t.slug }}>
                <a href={`/topic/${t}`} onClick={() => setFilterTopic(t.slug || '')}>
                  <span classList={{ transparent: filterTopic() !== t.slug }}>#{t.title}</span>
                </a>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </nav>
  )
}
