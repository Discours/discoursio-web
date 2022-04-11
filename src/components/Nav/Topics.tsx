import { For, createSignal } from 'solid-js'
import { Topic } from '../../graphql/types.gen'

export default (props: { topics: Topic[] }) => {
  const [filterTopic, setFilterTopic] = createSignal()

  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <For each={Array.from(props?.topics)}>
          {(t: Topic) => (
            <li class='item' classList={{ selected: filterTopic() === t.slug }}>
              <a href={`/topic/${t.slug}`} onClick={() => setFilterTopic(t.slug || '')}>
                <span classList={{ transparent: filterTopic() !== t.slug }}>#{t.title}</span>
              </a>
            </li>
          )}
        </For>
      </ul>
    </nav>
  )
}
