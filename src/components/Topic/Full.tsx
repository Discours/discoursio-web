import { createMemo } from 'solid-js'
import { Show } from 'solid-js/web'
import { useStore } from '../../store'
import { Topic } from '../../graphql/types.gen'

export default (props: { topic: Topic }) => {
  const [{ topicsSubscribed }, { toggleTopic }] = useStore()
  const subscribed = createMemo(() => Boolean(topicsSubscribed.filter((t) => t === props.topic.slug)))

  return (
    <div class='topic-full container'>
      <div class='row'>
        <div class='topic__header col-md-8 offset-md-2'>
          <h1>#{props.topic.title}</h1>
          <Show when={props.topic.body}>
            <p>{props.topic.body}</p>
          </Show>
          <div class='topic__actions'>
            <button onClick={() => toggleTopic(props.topic.slug)} class='button'>
              <Show when={!subscribed} fallback={'Отписаться от темы'}>
                Подписаться на тему
              </Show>
            </button>
            <a href={`/create/${props.topic.slug}`}>Написать в тему</a>
          </div>
          <Show when={props.topic.pic}>
            <img src={props.topic.pic as string} alt={props.topic.title as string} />
          </Show>
        </div>
      </div>
    </div>
  )
}
