import { Component, Show, createMemo, createSignal, createEffect } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row2 from '../components/Article/Row2'
import Row3 from '../components/Article/Row3'
import Beside from '../components/Article/Beside'
import AuthorFull from '../components/Author/Full'
import { byCreated, byRating, byViews } from '../utils/sortby'
import '../styles/Topic.scss'
import { ZineState } from '../store/zine'

export const AuthorPage: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const author = createMemo<Partial<User>>(() => data.author as Partial<User>)

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
      case 'rating':
        r = Object.values(data.articles||{}).sort(byRating)  as Partial<Shout>[]
      case 'comments':
        r = Object.values(data.articles||{}).sort(byRating) as Partial<Shout>[]
      case 'views':
        r = Object.values(data.articles||{}).sort(byViews) as Partial<Shout>[]
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
      <Show when={!data.authorLoading}>
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
