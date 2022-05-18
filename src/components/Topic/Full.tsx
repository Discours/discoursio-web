import { createMemo } from 'solid-js'
import { Show } from 'solid-js/web'
import { useStore } from '../../store'
import { Topic } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'

export default (props: { topic: Topic }) => {
  const [t] = useI18n()
  const [{ currentUser }, { toggleTopic }] = useStore()
  const subscribed = createMemo(() => Boolean(currentUser?.userSubscribedTopics?.filter((t) => t === props.topic.slug)))

  return (
    <div class='topic-full container'>
      <div class='row'>
        <Show when={!!props.topic?.slug}>
          <div class='topic__header col-md-8 offset-md-2'>
            <h1>#{props.topic.title}</h1>
              <p>{props.topic.body}</p>
            <div class='topic__actions'>
              <button onClick={() => toggleTopic(props.topic.slug)} class='button'>
                <Show when={!subscribed} fallback={t('Unfollow the topic')}>
                  {t('Follow the topic')}
                </Show>
              </button>
              <a href={`/create/${props.topic.slug}`}>{t('Write about the topic')}</a>
            </div>
            <Show when={props.topic.pic}>
              <img src={props.topic.pic as string} alt={props.topic.title as string} />
            </Show>
          </div>
        </Show>
      </div>
    </div>
  )
}
