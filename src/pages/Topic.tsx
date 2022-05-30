import { Component, For, createSignal, Show, createMemo } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Beside from '../components/Article/Beside'
// import Row1 from '../components/Article/Row1'
import ArticleCard from '../components/Article/Card'
import './Topic.scss'
import { byComments, byCreated, byRating, byViews } from '../utils/by'
import TopicFull from '../components/Topic/Full'

export const BlogTopic: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug: string
    lang: string
    page: number
    size: number
    articles: Partial<Shout>[]
    topics?: Topic[]
    topicsLoading?: boolean
  }>()

  let authors = createMemo<Partial<User>[]>(() => {
    let authorset = new Set([] as Partial<User>[])
    data.articles?.forEach((a) => a.authors?.forEach((u) => authorset.add(u)))
    return Array.from(authorset)
  })
  const topic = createMemo<Topic>(() => data.topics?.find((t: Topic) => t.slug === data.slug) as Topic)
  const topRated = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byRating))
  const topViewed = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byViews))
  const topCommented = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byComments))
  const topRecent = createMemo(() => Array.from(data.articles || []).sort(byCreated))
  const [mode, setMode] = createSignal('fresh')
  const selected = createMemo(() => {
    const m = mode()
    if (m === 'fresh') return topRecent()
    if (m === 'popular') return topRated()
    if (m === 'discuss') return topCommented()
    return topViewed()
  })
  const title = createMemo(() => {
    const m = mode()
    if (m === 'fresh') return t('Top recent')
    if (m === 'popular') return t('Top rated')
    if (m === 'discuss') return t('Top discussed')
    return t('Top viewed')
  })
  useRouteReadyState()
  return (
    <div class='container'>
      <Show when={!data.topicsLoading || !data.loading}>
        <Show when={!data.topicsLoading && !!topic()?.slug}>
          <TopicFull topic={topic() as Topic} />
        </Show>
        <div class='row group__controls'>
          <div class='col-md-8'>
            <ul class='view-switcher'>
              <li classList={{ selected: mode() === 'fresh' }}>
                <button type='button' onClick={() => setMode('fresh')}>
                  {t('Recent')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'popular' }}>
                <button type='button' onClick={() => setMode('popular')}>
                  {t('Popular')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'views' }}>
                <button type='button' onClick={() => setMode('views')}>
                  {t('Views')}
                </button>
              </li>
              <li classList={{ selected: mode() === 'discuss' }}>
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
          <div class='floor floor--important'>
            <div class='container'>
              <div class='row'>
                <h3 class='col-12'>{title()}</h3>
                <For each={selected()}>
                  {(a: Partial<Shout>) => (
                    <div class='col-md-6'>
                      <ArticleCard article={a} />
                    </div>
                  )}
                </For>
              </div>
            </div>
          </div>
        </div>

        <div class='row'>
          <Show when={!data.loading && !!data.articles}>
            <Beside
              title={t('Topic is supported by')}
              values={authors().slice(0, 5)}
              beside={data.articles[0]}
              wrapper={'author'}
            />
            <Row3 articles={data.articles.slice(1, 4)} />
            <Row2 articles={data.articles.slice(4, 6)} />
            <Row3 articles={data.articles.slice(10, 13)} />
            <Row3 articles={data.articles.slice(13, 16)} />
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default BlogTopic
