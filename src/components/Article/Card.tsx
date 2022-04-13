import { For, Show } from 'solid-js/web'
import { Shout, Topic, User } from '../../graphql/types.gen'
import Icon from '../Nav/Icon'
import './Card.scss'

interface CardProps {
  settings?: {
    noicon?: boolean
    noimage?: boolean
    nosubtitle?: boolean
    isGroup?: boolean
    photoBottom?: boolean
    additionalClass?: boolean
  }
  article: Partial<Shout>
}

export default (props: CardProps) => {
  // eslint-disable-next-line solid/reactivity
  const { settings, article } = props

  return (
    <section
      class='shout-card'
      classList={{
        'shout-card--short': settings?.noimage,
        'shout-card--photo-bottom': settings?.noimage && settings?.photoBottom,
        additionalClass: settings?.additionalClass
      }}
    >
      <Show when={!settings?.noimage}>
        <div class='shout-card__cover-container'>
          <div class='shout-card__cover'>
            <img src={article.cover || ''} alt={article.title || ''} loading='lazy' />
          </div>
        </div>
      </Show>

      <div class='shout-card__content'>
        <Show
          when={article.layout && article.layout !== 'article' && !(settings?.noicon || settings?.noimage)}
        >
          <div class='shout-card__type'>
            <a
              href={`/topic/${
                (article.topics as Topic[]).filter((t) => article.mainTopic === t.slug)[0].slug
              }`}
            >
              <Icon name={article.layout} />
            </a>
          </div>
        </Show>

        <Show when={!settings?.isGroup}>
          <For each={(article.topics as Topic[]).filter((t: Topic) => article.mainTopic === t.slug)}>
            {(topic: Topic) => (
              <div class='shout__topic'>
                <a href={`/topic/${topic.slug}`}>{topic.title}</a>
              </div>
            )}
          </For>
        </Show>

        <div class='shout-card__title'>
          <a href={`/${article.slug}`}>{article.title}</a>
        </div>

        <Show when={!settings?.nosubtitle && article.subtitle}>
          <div class='shout-card__subtitle'>{props.article.subtitle}</div>
        </Show>

        <div class='shout__author'>
          <For each={article.authors}>
            {(a: Partial<User>) => (
              <>
                <Show when={(article.authors as Partial<User>[]).indexOf(a) > 0}>, </Show>
                <a href={`/@${a.slug}`}>{a.name}</a>
              </>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}
