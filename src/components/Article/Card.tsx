import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { createSignal, onMount } from 'solid-js'
import { For, Show } from 'solid-js/web'
import { Shout, Topic, User } from '../../graphql/types.gen'
import { capitalize } from '../../utils'
import { translit } from '../../utils/ru2en'
import Icon from '../Nav/Icon'
import './Card.scss'

interface CardProps {
  settings?: {
    noicon?: boolean
    noimage?: boolean
    nosubtitle?: boolean
    noauthor?: boolean
    isGroup?: boolean
    photoBottom?: boolean
    additionalClass?: string
    isFeedMode?: boolean
  }
  article: Partial<Shout>
}

export default (props: CardProps) => {
  const [t, { locale }] = useI18n()
  const [title, setTitle] = createSignal<string>('')
  const [subtitle, setSubtitle] = createSignal<string>('')
  const { settings } = props
  onMount(() => {
    setTitle(props.article?.title || '')
    if (!props.article?.subtitle) {
      let tt: string[] = props.article?.title?.split('. ') || []
      if (tt?.length === 1) tt = props.article?.title?.split(/{!|\?|:|;}\s/) || []
      if (tt && tt.length > 1) {
        const sep = props.article.title?.replace(tt[0], '').split(' ', 1)[0]
        setTitle(tt[0] + (!(sep === '.' || sep === ':') ? sep : ''))
        setSubtitle(capitalize(props.article.title?.replace(tt[0] + sep, '') as string, true))
      }
    } else {
      setSubtitle(props.article.subtitle || '')
    }
  })
  const author = (a: Partial<User>) => {
    if(a.name === 'Дискурс' && locale() !== 'ru') return 'Discours'
    else return translit(a.name || '', locale() || 'ru')
  }
  const tag = (t: Topic) => (/[а-яА-ЯЁё]/.test(t.title || '') && locale() !== 'ru' ? t.slug : t.title)
  return (
    <section
      class={`shout-card ${settings?.additionalClass ? settings?.additionalClass : ''}`}
      classList={{
        'shout-card--short': settings?.noimage,
        'shout-card--photo-bottom': settings?.noimage && settings?.photoBottom,
        'shout-card--feed': settings?.isFeedMode
      }}
    >
      <Show when={!settings?.noimage && props.article?.cover}>
        <div class='shout-card__cover-container'>
          <div class='shout-card__cover'>
            <img src={props.article.cover || ''} alt={props.article.title || ''} loading='lazy' />
          </div>
        </div>
      </Show>

      <div class='shout-card__content'>
        <Show
          when={
            props.article?.layout &&
            props.article?.layout !== 'article' &&
            !(settings?.noicon || settings?.noimage)
          }
        >
          <div class='shout-card__type'>
            <NavLink
              href={`/topic/${
                (props.article?.topics as Topic[]).filter((t) => props.article.mainTopic === t.slug)[0].slug
              }`}
            >
              <Icon name={props.article.layout} />
            </NavLink>
          </div>
        </Show>

        <Show when={!settings?.isGroup && props.article?.topics}>
          <For
            each={(props.article.topics as Topic[]).filter(
              (t: Topic) => props.article.mainTopic === t.slug
            )}
          >
            {(topic: Topic) => (
              <div class='shout__topic'>
                <NavLink href={`/topic/${topic.slug}`}>{tag(topic)}</NavLink>
              </div>
            )}
          </For>
        </Show>

        <div class='shout-card__title'>
          <NavLink href={`/${props.article?.slug || ''}`}>{title()}</NavLink>
        </div>

        <Show when={!settings?.nosubtitle && subtitle()}>
          <div class='shout-card__subtitle'>{subtitle()}</div>
        </Show>

        <Show when={!settings?.noauthor}>
          <div class='shout__author'>
            <For each={props.article?.authors || []}>
              {(a: Partial<User>) => (
                <>
                  <Show when={(props.article?.authors as Partial<User>[]).indexOf(a) > 0}>, </Show>
                  <NavLink href={`/author/${a.slug}`}>{author(a)}</NavLink>
                </>
              )}
            </For>
          </div>
        </Show>

        <Show when={settings?.isFeedMode}>
          <section class="shout-card__details">
            <div class="shout-card__details-content">
              <div class="shout-card__details-item rating">
                <button class="rating__control">&minus;</button>
                <span class="rating__value">{props.article.stat?.ratings}</span>
                <button class="rating__control">+</button>
              </div>

              <div class="shout-card__details-item shout-card__comments">
                <Icon name="comment"/>
                {props.article.stat?.comments}
              </div>

              <div class="shout-card__details-item">
                <button><Icon name="bookmark"/></button>
              </div>

              <div class="shout-card__details-item">
                <button><Icon name="ellipsis"/></button>
              </div>
            </div>

            <button class="button--light shout-card__edit-control">{t('Collaborate')}</button>
          </section>
        </Show>
      </div>
    </section>
  )
}
