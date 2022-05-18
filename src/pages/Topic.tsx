import { Component, For, createSignal, createEffect, Show } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Beside from '../components/Article/Beside'
import Row1 from '../components/Article/Row1'
import ArticleCard from '../components/Article/Card'
import { useStore } from '../store'
import './Topics.scss'

export const BlogTopic: Component = () => {

  const byRating = (a: Partial<Shout>, b: Partial<Shout>) => {
    const x = a?.stat?.ratings as number
    const y = b?.stat?.ratings as number
    if (x > y) return -1
    if (x < y) return 1
    return 0
  }

  const byViews = (a: Partial<Shout>, b: Partial<Shout>) => {
    const x = a?.stat?.views as number
    const y = b?.stat?.views as number
    if (x > y) return -1
    if (x < y) return 1
    return 0
  }

  const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug: string
    lang: string
    page: number
    size: number
    articles: Partial<Shout>[]
  }>()
  let topRated: Partial<Shout>[] = []
  let topViewed: Partial<Shout>[] = []
  let authors: Partial<User>[] = []
  let topic: Topic = {} as Topic
  useRouteReadyState()
  const [mode, setMode] = createSignal('fresh')
  const sortBy = (by: string) => {
    setMode(by)
    // TODO: something else
  }
  createEffect(() => {
    if(!topRated && !!data.articles) {
      topRated = Array.from(data.articles || []).sort(byRating)
      topViewed = Array.from(data.articles || []).sort(byViews)
      let authorset = new Set([] as Partial<User>[])
      data.articles.forEach(a => a.authors?.forEach(u => authorset.add(u)))
      authors = Array.from(authorset)
    }
  })
  const [{ topics }, ] = useStore()
  createEffect(() => {
    topic = topics?.find((t:Topic) => t.slug === data.slug) as Topic
  })
  return (
  <div class="container">
    <div class="row topic__controls">
      <div class="col-md-8">
        <ul class="view-switcher">
          <li classList={{ selected: mode() === 'fresh' }}>
            <button type="button" onClick={() => sortBy('fresh')}>
              {t('Recent')}
            </button>
          </li>
          <li classList={{ selected: mode() === 'popular' }}>
            <button type="button" onClick={() => sortBy('popular')}>
              {t('Popular')}
            </button>
          </li>
          <li classList={{ selected: mode() === 'discuss' }}>
            <button type="button" onClick={() => sortBy('discuss')}>
              {t('Discussing')}
            </button>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <div class="mode-switcher">
          {t('Show')}
          <span class="mode-switcher__control">{t('All posts')}</span>
        </div>
      </div>
    </div>

    <div class="row">
      <Show when={!data.loading && data.articles?.length > 0}>
        <Row1 article={data.articles[0]} />
        <Row3 articles={data.articles.slice(1, 4)} />
        <Row2 articles={data.articles.slice(4, 6)} />
        <Beside
          title={t('Topic is supported by')}
          values={authors.slice(0, 5)}
          beside={data.articles[6]}
          wrapper={'author'}
        />
        <div class="floor floor--important">
          <div class="container">
            <div class="row">
              <h3 class="col-12">{t('Popular')}</h3>
              <For each={topViewed}>
                {(a:Partial<Shout>)=> (<div class="col-md-6">
                  <ArticleCard article={a} />
                </div>
                )}
              </For>
            </div>
          </div>
        </div>
        <Row3 articles={data.articles.slice(10, 13)} />
        <Row3 articles={data.articles.slice(13, 16)} />
        <div class="floor floor--important">
          <div class="container">
            <div class="row">
              <h3 class="col-12">{t('Favorites')}</h3>
              <For each={topRated}>
                {(a:Partial<Shout>) => (
                <div class="col-md-4">
                  <ArticleCard article={a} />
                </div>
                )}
              </For>
            </div>
          </div>
        </div>
        <Row2 articles={data.articles.slice(0, 2)} />
        <Row3 articles={data.articles.slice(2, 5)} />
        <Row2 articles={data.articles.slice(5, 7)} />
      </Show>
    </div>
  </div >
  )
}

export default BlogTopic
