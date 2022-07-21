import { Component, Show, createMemo, createSignal, createEffect } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row2 from '../components/Article/Row2'
import Row3 from '../components/Article/Row3'
import Beside from '../components/Article/Beside'
import AuthorFull from '../components/Author/Full'
import { byCreated, byReacted, byViewed } from '../utils/sortby'
import '../styles/Topic.scss'
import { ZineState } from '../context/zine'
import { usePromiseQuery } from '../utils/promiseQuery'
import { useClient } from 'solid-urql'
import authorsBySlugs from '../graphql/q/authors-by-slugs'
import { handleUpdate } from '../context/_api'

export const AuthorPage: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const slug = createMemo<string>(() => {
    let slug = data.params?.slug
    if(data.params?.slug.startsWith('@'))  slug = slug.replace('@','')
    return slug
  })
  const [promiseQuery, ] = usePromiseQuery(useClient())
  const [author, setAuthor] = createSignal<Partial<User>>()
  createEffect(() => {
    if(!author() && slug()) {
      if(Object.keys(data.authors || {}).length > 0) {
        const a = data['authors'] ? data['authors'][slug()] : null
        if (!!a) {
          setAuthor(a)
          return
        }
      }
      if(slug()) promiseQuery(authorsBySlugs, { slugs: [slug(), ] })
        .then(handleUpdate)
        .then(() => setAuthor(data['authors'][slug()]))
    }
  })

  const [authorTopics, setAuthorTopics] = createSignal<Partial<Topic>[]>([])
  createEffect(() => {
    if(authorTopics() === [] && data['shoutsByAuthors'].length > 0) {
      let r = [] as Topic[]
      data['shoutsByAuthors'].forEach((a: Partial<Shout>) => {
        a.topics?.forEach((topic) => {
          if (!r.find((t) => t.slug === topic?.slug)) r.push(topic as Topic)
        })
      })
      setAuthorTopics(r)
    }
  })
  const [mode,setMode] = createSignal('fresh')
  const articles = createMemo<Partial<Shout>[]>(() => {
    let r = [] as Partial<Shout>[]
    switch(mode()) {
      case 'reacted':
        r = Object.values(data.articles||{}).sort(byReacted) as Partial<Shout>[]
        break
      case 'viewed':
        r = Object.values(data.articles||{}).sort(byViewed) as Partial<Shout>[]
        break
      case 'created':
      default:
        r = Object.values(data.articles||{}).sort(byCreated) as Partial<Shout>[]
    }
    return r
  })
  const title = createMemo(() => {
    const m = mode()
    if (m === 'views') return t('Top viewed')
    if (m === 'rating') return t('Top rated')
    if (m === 'comments') return t('Top discussed')
    return t('Top recent')
  })
  useRouteReadyState()
  return (
    <div class='container author-page'>
      <Show when={'getUsersBySlugs' in data} fallback={<div class="center">{t('Loading')}</div>}>
        <AuthorFull author={author() as Partial<User>} />
        <div class='row group__controls'>
          <div class='col-md-8'>
            <ul class='view-switcher'>
              <li classList={{ selected: mode() === 'created' }}>
                <button type='button' onClick={() => setMode('fresh')}>
                  {t('Recent')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'rating' }}>
                <button type='button' onClick={() => setMode('popular')}>
                  {t('Popular')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'views' }}>
                <button type='button' onClick={() => setMode('views')}>
                  {t('Views')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'comments' }}>
                <button type='button' onClick={() => setMode('discuss')}>
                  {t('Discussing')}
                </button>
              </li>
            </ul>
          </div>
          <div class='col-md-4'>
            <div class='mode-switcher'>
              {`${t('Show')} `}
              <span class='mode-switcher__control'>{t('All posts')}</span>
            </div>
          </div>
        </div>

        <div class='floor'>
          <h3 class='col-12'>{title()}</h3>
          <div class='row'>
            <Show when={articles()?.length > 0}>
              <Beside
                title={t('Topics which supported by author')}
                values={authorTopics()?.slice(0, 5)}
                beside={articles()[0]}
                wrapper={'topic'}
                topicShortDescription={true}
              />
              <Row3 articles={articles().slice(1, 4)} />
              <Row2 articles={articles().slice(4, 6)} />
              <Row3 articles={articles().slice(10, 13)} />
              <Row3 articles={articles().slice(13, 16)} />
            </Show>
          </div>
        </div>

      </Show>
    </div>
  )
}

export default AuthorPage
