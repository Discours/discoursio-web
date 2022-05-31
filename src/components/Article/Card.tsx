import { NavLink } from 'solid-app-router'
import { createEffect, createSignal } from 'solid-js'
import { For, Show } from 'solid-js/web'
import { Shout, Topic, User } from '../../graphql/types.gen'
import { capitalize } from '../../utils'
import Icon from '../Nav/Icon'
import './Card.scss'

interface CardProps {
  settings?: {
    noicon?: boolean
    noimage?: boolean
    nosubtitle?: boolean
    isGroup?: boolean
    photoBottom?: boolean
    additionalClass?: string
  }
  article: Partial<Shout>
}

export default (props: CardProps) => {
  // eslint-disable-next-line solid/reactivity
  const [title, setTitle] = createSignal(props.article.title)
  const [subtitle, setSubtitle] = createSignal(props.article.subtitle)
  const { settings } = props
  const seps = [':', '?', '!']
  createEffect(() => {
    let a = props.article
    if (!!a && !a.subtitle) {
      let tt = a.title?.split('.')
      if (tt) {
        seps.forEach((c) => {
          if (tt?.length === 1) {
            tt = a.title?.split(c)
            if (tt && tt.length > 1) tt[0] = tt[0] + (c === ':' ? '' : c)
          }
        })
      }
      setTitle(tt ? tt[0] : a.title)
      if (tt && tt.length > 1) setSubtitle(capitalize(tt[1], true))
    }
  })
  return (
    <>
      <section
        class={`shout-card ${settings?.additionalClass}`}
        classList={{
          'shout-card--short': settings?.noimage,
          'shout-card--photo-bottom': settings?.noimage && settings?.photoBottom
        }}
      >
        <Show when={!settings?.noimage && props.article.cover}>
          <div class='shout-card__cover-container'>
            <div class='shout-card__cover'>
              <img src={props.article.cover || ''} alt={props.article.title || ''} loading='lazy' />
            </div>
          </div>
        </Show>

        <div class='shout-card__content'>
          <Show
            when={
              props.article.layout && props.article.layout !== 'article' && !(settings?.noicon || settings?.noimage)
            }
          >
            <div class='shout-card__type'>
              <NavLink
                href={`/topic/${
                  (props.article.topics as Topic[]).filter((t) => props.article.mainTopic === t.slug)[0].slug
                }`}
              >
                <Icon name={props.article.layout} />
              </NavLink>
            </div>
          </Show>

          <Show when={!settings?.isGroup && props.article.topics}>
            <For each={(props.article.topics as Topic[]).filter((t: Topic) => props.article.mainTopic === t.slug)}>
              {(topic: Topic) => (
                <div class='shout__topic'>
                  <NavLink href={`/topic/${topic.slug}`}>{topic.title}</NavLink>
                </div>
              )}
            </For>
          </Show>

          <div class='shout-card__title'>
            <NavLink href={`/${props.article.slug}`}>{title()}</NavLink>
          </div>

          <Show when={!settings?.nosubtitle && subtitle()}>
            <div class='shout-card__subtitle'>{subtitle()}</div>
          </Show>

          <div class='shout__author'>
            <For each={props.article.authors}>
              {(a: Partial<User>) => (
                <>
                  <Show when={(props.article.authors as Partial<User>[]).indexOf(a) > 0}>, </Show>
                  <NavLink href={`/author/${a.slug}`}>{a.name}</NavLink>
                </>
              )}
            </For>
          </div>
        </div>
      </section>
    </>
  )
}
