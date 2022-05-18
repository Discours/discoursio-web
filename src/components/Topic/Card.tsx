import { capitalize, plural } from '../../utils'
import { Show } from 'solid-js/web'
import './Card.scss'
import { useStore } from '../../store'
import { createEffect, createSignal } from 'solid-js'
import { Topic } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'

interface TopicProps {
  topic: Topic
  compact?: boolean
  subscribed?: boolean
}

export default (props: TopicProps) => {
  const [t] = useI18n()
  const [subscribed, setSubscribed] = createSignal()
  const [ ,{ follow, unfollow }] = useStore()
  createEffect(() => {
    setSubscribed(props.subscribed)
  })
  const subscribe = () => {
    follow('topic', props.topic.slug)
    // setSubscribed(true) // shouldn't be needed
  }
  const unsubscribe = () => {
    unfollow('topic', props.topic.slug)
    // setSubscribed(false)
  }

  return (
    <div class='topic row'>
      <div class='col-md-7'>
        <div class='topic-title'>
          <a href={`/topic/${props.topic.slug}`}>{capitalize(props.topic.title || '')}</a>
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
              +&nbsp;{t('Follow')}
            </button>
          }
        >
          <button onClick={unsubscribe} class='button'>
            -&nbsp;{t('Unfollow')}
          </button>
        </Show>
      </div>
      <div class='col-md-3'>{/* TODO: add topics' pics to db  */}</div>
    </div>
  )
}
