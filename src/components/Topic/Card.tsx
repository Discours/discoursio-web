import { capitalize, plural } from '../../utils'
import { Show } from 'solid-js/web'
import './Card.scss'
import { createResource, createSignal } from 'solid-js'
import { Topic } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'
import { useZine } from '../../store/zine'

interface TopicProps {
  topic: Topic
  compact?: boolean
  subscribed?: boolean
  shortDescription?: boolean,
  subscribeButtonBottom?: boolean
}

export default (props: TopicProps) => {
  // console.debug(props.topic)
  const [t, { locale }] = useI18n()
  const [subscribed, setSubscribed] = createSignal<boolean>(props.subscribed as boolean)
  // const [subscribers, setSubscribers] = createSignal<number>(props.topic.topicStat?.subscriptions as number || 0)
  const [, { follow, unfollow }] = useZine()
  const [body] = createResource(props.topic?.body, () => props.topic?.body)
  const subscribe = ( really = true ) => {
    if (really) {
      follow('topic', props.topic.slug)
      setSubscribed(true)
      // setSubscribers(props.topic.topicStat?.subscriptions as number + 1)
    } else {
      unfollow('topic', props.topic.slug)
      setSubscribed(false)
      // setSubscribers(props.topic.topicStat?.subscriptions as number - 1)
    }
  }
  return (
    <div class='topic' classList={{'row': !props.compact && !props.subscribeButtonBottom}}>
      <div classList={{'col-md-7': !props.compact && !props.subscribeButtonBottom}}>
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

        <Show when={!props.compact && !body.loading}>
          <div class='topic-description' classList={{'topic-description--short': props.shortDescription}}>
            {body}
          </div>
        </Show>

        <Show when={props.topic.topicStat}>

            <div class='topic-details'>

              <Show when={!props.compact}>
                <span class='topic-details__item' classList={{ compact: props.compact }}>
                {props.topic.topicStat?.shouts + ' ' + t('post') + plural(
                    props.topic.topicStat?.shouts || 0,
                    locale() === 'ru' ? ['????', '', '??'] : ['s', '', 's']
                  )}
                </span>
                <span class='topic-details__item' classList={{ compact: props.compact }}>
                  {props.topic.topicStat?.authors + ' ' + t('author') + plural(
                      props.topic.topicStat?.authors || 0,
                      locale() === 'ru' ? ['????', '', '??'] : ['s', '', 's']
                    )}
                </span>
                <Show when={!props.subscribeButtonBottom}>
                  <span class='topic-details__item'>
                    {props.topic.topicStat?.views + ' ' + t('view') + plural(
                      props.topic.topicStat?.views || 0,
                      locale() === 'ru' ? ['????', '', '??'] : ['s', '', 's']
                    )}
                  </span>
                </Show>
              </Show>

{/*
              <span class='topic-details__item'>
                {subscribers().toString() + ' ' + t('follower') + plural(
                  subscribers(),
                  locale() === 'ru' ? ['????', '', '??'] : ['s', '', 's']
                )}
              </span>
*/}
            </div>
          </Show>
      </div>
      <div classList={{'col-md-3': !props.compact && !props.subscribeButtonBottom}}>
        <Show when={subscribed()} fallback={
            <button onClick={() => subscribe(true)} class='button--light'>
              +&nbsp;{t('Follow')}
            </button>
          }>
            <button onClick={() => subscribe(false)} class='button--light'>
              -&nbsp;{t('Unfollow')}
            </button>
        </Show>
        {/* TODO: add topics' pics to db  */}
      </div>
    </div>
  )
}
