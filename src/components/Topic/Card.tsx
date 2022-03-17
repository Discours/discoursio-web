import { capitalize, plural } from '~/lib/utils'
import { Show } from 'solid-js/web'
import './Card.scss'
import { useStore } from '~/store'
import { createSignal } from 'solid-js'
export default (props) => {
  const [subscribed, setSubscribed] = createSignal()
  const store = useStore()
  const { currentUser } = store[0]
  const subscribe = () => {}
  const unsubscribe = () => {}
  return (
    <div class='topic row'>
      <div class='col-md-7'>
        <div class='topic-title'>
          <a href='/topic/{topic.slug}'>{capitalize(props.topic.title)}</a>
        </div>
        <Show when={props.topic.pic}>
          <div class='topic__avatar'>
            <a href={props.topic.slug}>
              <img src={props.topic.pic} alt={props.topic.title} />
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
              {props.topic.topicStat.shouts} публикаци
              {plural(props.topic.topicStat.shouts, 'я', 'и', 'й')}
            </span>
            <span class='topic-details__item' classList={{ compact: props.compact }}>
              {props.topic.topicStat.authors} автор
              {plural(props.topic.topicStat.authors, '', 'а', 'ов')}
            </span>
            <Show when={!props.compact}>
              <span class='topic-details__item'>
                {props.topic.topicStat.views} просмотр
                {plural(props.topic.topicStat.views, '', 'а', 'ов')}
              </span>
              <span class='topic-details__item'>
                {props.topic.topicStat.subscriptions} подписчик
                {plural(props.topic.topicStat.subscriptions, '', 'а', 'ов')}
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
