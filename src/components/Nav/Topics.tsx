import { For, createSignal } from 'solid-js'
import { Topic } from '~/lib/graphql/types.gen'

export default (props) => {
  const [filterTopic, setFilterTopic] = createSignal()

  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <For each={props.topics}>
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
