import { Component, Show, For, createMemo, createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
// import { useAppContext } from '../AppContext'
import { Community, Shout, Topic, User } from '../graphql/types.gen'
import Row2 from '../components/Article/Row2'
import Row3 from '../components/Article/Row3'
import Beside from '../components/Article/Beside'
import ArticleCard from '../components/Article/Card'
import AuthorFull from '../components/Author/Full'
import { byComments, byCreated, byRating, byViews } from '../utils/sortby'
import './Topic.scss'

// FIXME
export const BlogAuthor: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    authorLoading: boolean
    params: { [key: string]: string }
    author: Partial<User>
    communities?: { [id: string]: Partial<Community> }
    articles: Partial<Shout>[]
    articlesLoading?: boolean
    topics: Topic[]
    topicsLoading: boolean
  }>()
  const author = createMemo<Partial<User>>(() => data.author as Partial<User>)
  const authorTopics = createMemo<Topic[]>(() => {
    let r = [] as Topic[]
    data.articles?.forEach((a: Partial<Shout>) => {
      a.topics?.forEach((topic) => {
        if (!r.find((t) => t.slug === topic?.slug)) r.push(topic as Topic)
      })
    })
    return r
  })
  const topRated = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byRating))
  const topViewed = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byViews))
  const topCommented = createMemo<Partial<Shout>[]>(() => Array.from(data.articles || []).sort(byComments))
  const recentPublished = createMemo(() => Array.from(data.articles || []).sort(byCreated))
  const [mode, setMode] = createSignal('fresh')
  const selected = createMemo(() => {
    const m = mode()
    if (m === 'fresh') return recentPublished()
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
      <Show when={!data.authorLoading}>
        <AuthorFull author={author() as Partial<User>} />
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
        </div>

        <div class='floor'>
          <div class='row'>
            <h3 class='col-12'>{title()}</h3>
            <For each={selected()}>
              {(a: Partial<Shout>, index) => (
                <>
                  <Show when={selected().length > 3 && index() % 5 < 2 || selected().length < 3}>
                    <div class='col-md-6'>
                      <ArticleCard article={a} settings={{noauthor: true}}/>
                    </div>
                  </Show>
                  <Show when={selected().length = 3 || index() % 5 > 1}>
                    <div class='col-md-4'>
                      <ArticleCard article={a} settings={{noauthor: true}}/>
                    </div>
                  </Show>
                </>
              )}
            </For>
          </div>
        </div>

        <div class='row'>
          <Show when={!data.articlesLoading && Boolean(data.articles)}>
            <Beside
              title={t('Topics which supported by author')}
              values={authorTopics()?.slice(0, 5)}
              beside={data.articles[0]}
              wrapper={'topic'}
              topicShortDescription={true}
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

export default BlogAuthor
