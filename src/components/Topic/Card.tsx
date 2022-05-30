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
  const [t, { locale }] = useI18n()
  const [subscribed, setSubscribed] = createSignal()
  const [, { follow, unfollow }] = useStore()
  createEffect(() => {
    setSubscribed(props.subscribed)
  })

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
              {props.topic.topicStat?.shouts} {t('post')}
              {plural(
                props.topic.topicStat?.shouts as number,
                locale() === 'ru' ? ['й', 'я', 'и'] : ['s', '', 's']
              )}
            </span>
            <span class='topic-details__item' classList={{ compact: props.compact }}>
              {props.topic.topicStat?.authors} {t('author')}
              {plural(
                props.topic.topicStat?.authors as number,
                locale() === 'ru' ? ['ов', '', 'а'] : ['s', '', 's']
              )}
            </span>
            <Show when={!props.compact}>
              <span class='topic-details__item'>
                {props.topic.topicStat?.views} {t('view')}
                {plural(
                  props.topic.topicStat?.views as number,
                  locale() === 'ru' ? ['ов', '', 'а'] : ['s', '', 's']
                )}
              </span>
              <span class='topic-details__item'>
                {props.topic.topicStat?.subscriptions} {t('follower')}
                {plural(
                  props.topic.topicStat?.subscriptions as number,
                  locale() === 'ru' ? ['ов', '', 'а'] : ['s', '', 's']
                )}
              </span>
            </Show>
          </div>
        </Show>

        <Show
          when={subscribed()}
          fallback={
            <button onClick={() => follow('topic', props.topic.slug)} class='button'>
              +&nbsp;{t('Follow')}
            </button>
          }
        >
          <button onClick={() => unfollow('topic', props.topic.slug)} class='button'>
            -&nbsp;{t('Unfollow')}
          </button>
        </Show>
      </div>
      <div class='col-md-3'>{/* TODO: add topics' pics to db  */}</div>
    </div>
  )
}
