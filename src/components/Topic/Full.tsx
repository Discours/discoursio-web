import { createMemo } from 'solid-js'
import { Show } from 'solid-js/web'
import { useStore } from '~/store'

export default ({ topic }) => {
  const store = useStore()
  const { userTopics } = store[0]
  const { topicSubscribe, topicUnsubscribe } = store[1]
  const subscribed = createMemo(() => !!userTopics.filter((t) => t.slug === topic.slug))
  return (
    <div class='topic-full container'>
      <div class='row'>
        <div class='topic__header col-md-8 offset-md-2'>
          <h1>#{topic.title}</h1>
          <Show when={topic.body}>
            <p>{topic.body}</p>
          </Show>
          <div class='topic__actions'>
            <Show
              when={subscribed}
              fallback={
                <button onClick={() => topicSubscribe(topic.slug)} class='button'>
                  Подписаться на тему
                </button>
              }
            >
              <button onClick={() => topicUnsubscribe(topic.slug)} class='button'>
                Отписаться от темы
              </button>
            </Show>
            <a href={'/create/' + topic.slug}>Написать в тему</a>
          </div>
          <Show when={topic.pic}>
            <img src={topic.pic} alt={topic.title} />
          </Show>
        </div>
      </div>
    </div>
  )
}
