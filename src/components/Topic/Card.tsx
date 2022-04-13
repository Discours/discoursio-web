import { capitalize, plural } from '../../utils'
import { Show } from 'solid-js/web'
import './Card.scss'
import { useStore } from '../../store'
import { createSignal } from 'solid-js'
import { Topic } from '../../graphql/types.gen'

interface TopicProps {
  topic: Topic
  compact?: boolean
}

export default (props: TopicProps) => {
  const [subscribed, setSubscribed] = createSignal()
  const [{ currentUser }] = useStore()
  const subscribe = () => {
    // TODO: IMPLEMENT
  }
  const unsubscribe = () => {
    // TODO: IMPLEMENT
  }

  return (
    <div class='topic row'>
      <div class='col-md-7'>
        <div class='topic-title'>
          <a href='/topic/{topic.slug}'>{capitalize(props.topic.title as string)}</a>
        </div>
        <Show when={props.topic.pic}>
          <div class='topic__avatar'>
            <a href={props.topic.slug}>
              <img src={props.topic.pic as string} alt={props.topic.title as string} />
            </a>
          </div>
        </Show>
        <Show when={props.topic.body && !props.compact}>
          <p class='topic-description' classList={{ compact: props.compact }}>
            {props.topic.body}
          </p>
        </Show>
        <Show when={props.topic.topicStat}>
          <div class='topic-details'>
            <span class='topic-details__item' classList={{ compact: props.compact }}>
              {props.topic.topicStat?.shouts} публикаци
              {plural(props.topic.topicStat?.shouts as number, 'я', 'и', 'й')}
            </span>
            <span class='topic-details__item' classList={{ compact: props.compact }}>
              {props.topic.topicStat?.authors} автор
              {plural(props.topic.topicStat?.authors as number, '', 'а', 'ов')}
            </span>
            <Show when={!props.compact}>
              <span class='topic-details__item'>
                {props.topic.topicStat?.views} просмотр
                {plural(props.topic.topicStat?.views as number, '', 'а', 'ов')}
              </span>
              <span class='topic-details__item'>
                {props.topic.topicStat?.subscriptions} подписчик
                {plural(props.topic.topicStat?.subscriptions as number, '', 'а', 'ов')}
              </span>
            </Show>
          </div>
        </Show>

        <Show
          when={subscribed()}
          fallback={
            <button onClick={subscribe} class='button'>
              +&nbsp;Подписаться
            </button>
          }
        >
          <button onClick={unsubscribe} class='button'>
            -&nbsp;Отписаться
          </button>
        </Show>
      </div>
      <div class='col-md-3'>{/* TODO: add topics' pics to db  */}</div>
    </div>
  )
}
