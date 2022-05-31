import { NavLink } from 'solid-app-router'
import { For, Show, createMemo } from 'solid-js'
import { Topic } from '../../graphql/types.gen'
import './Topics.scss'

export default (props: any) => {
  const topics = createMemo(() => Array.from(props?.topics || [])) // TODO: something about subtopics
  return (
    <nav class='subnavigation wide-container text-2xl'>
      <ul class='topics'>
        <Show when={!!topics()}>
          <For each={Array.from(topics() as Topic[])}>
            {(t: Topic) => (
              <li class='item'>
                <NavLink href={`/topic/${t.slug}`}>
                  <span>#{t?.title || ''}</span>
                </NavLink>
              </li>
            )}
          </For>
        </Show>
      </ul>
    </nav>
  )
}
