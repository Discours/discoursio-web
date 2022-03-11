import { For, Show } from 'solid-js/web'
import { Topic, User } from '~/lib/graphql/types.gen'
import Icon from '../Nav/Icon'
import './Card.scss'
export default (props) => {
  // eslint-disable-next-line solid/reactivity
  const { noicon, noimage, nosubtitle, isGroup, photoBottom, additionalClass } = props.settings

  return (
    <section
      class='shout-card'
      classList={{
        'shout-card--short': noimage,
        'shout-card--photo-bottom': noimage && photoBottom,
        additionalClass
      }}
    >
      <Show when={!noimage}>
        <div class='shout-card__cover-container'>
          <div class='shout-card__cover'>
            <img src={props.article.cover} alt={props.article.title} loading='lazy' />
          </div>
        </div>
      </Show>

      <div class='shout-card__content'>
        <Show when={props.article.layout && props.article.layout !== 'article' && !(noicon || noimage)}>
          <div class='shout-card__type'>
            <a
              href={`/topic/${
                props.article.topics.filter((t) => props.article.mainTopic === t.slug)[0].slug
              }`}
            >
              <Icon name={props.article.layout} />
            </a>
          </div>
        </Show>

        <Show when={!isGroup}>
          <For each={props.article.topics.filter((t) => props.article.mainTopic === t.slug)}>
            {(topic: Topic) => (
              <div class='shout__topic'>
                <a href={`/topic/${topic.slug}`}>{topic.title}</a>
              </div>
            )}
          </For>
        </Show>

        <div class='shout-card__title'>
          <a href={`/${props.article.slug}`}>{props.article.title}</a>
        </div>

        <Show when={!nosubtitle && props.article.subtitle}>
          <div class='shout-card__subtitle'>{props.article.subtitle}</div>
        </Show>

        <div class='shout__author'>
          <For each={props.article.authors}>
            {(a: Partial<User>) => (
              <>
                <Show when={props.article.authors.indexOf(a) > 0}>, </Show>
                <a href={`/@${a.slug}`}>{a.name}</a>
              </>
            )}
          </For>
        </div>
      </div>
    </section>
  )
}
