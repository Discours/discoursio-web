import { For, createSignal, Show, createMemo, createEffect } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout, Topic, User } from '../graphql/types.gen'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Beside from '../components/Article/Beside'
// import Row1 from '../components/Article/Row1'
import ArticleCard from '../components/Article/Card'
import '../styles/Topic.scss'
import { byReacted, byCreated, byRating, byViewed } from '../utils/sortby'
import TopicFull from '../components/Topic/Full'
import { ZineState } from '../context/zine'
import { loaded } from '../context/_api'

export const TopicPage = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [mode, setMode] = createSignal('fresh')
  const [sortedArticles, setSortedArticles] = createSignal<Partial<Shout>[]>([])
  const [topicAuthors, setTopicAuthors] = createSignal<Partial<User>[]>([])

  const slug = createMemo<string>(() => {
    let slug = data.params?.slug
    if(data.params?.slug.startsWith(':'))  slug = slug.replace(':','')
    return slug
  })
  
  const topic = createMemo<Partial<Topic>>(() => (data.topics || {})[slug()])

  createEffect(() => {
    if ('topicsByCommunity' in loaded()) {
      setSortedArticles((Object.values((data.articles || {} ) as Partial<Shout>[]))
        .filter( (a: Partial<Shout>) => !!a.topics?.filter( (t: any) => t.slug === topic() ) )
        .sort(byCreated)
      )
    } 
  })

  createEffect(() => {
    if ('usersByTopic' in loaded()) {
      setTopicAuthors(( Object.values(data.authors || {}) as Partial<User>[] ).sort(byRating)) // works with User!
    }
  })

  createEffect(() => {
    const m = mode()
    if (m === 'fresh') setSortedArticles((sortedArticles()).sort(byCreated))
    // TODO: diffrent kinds reactions counters
    // if (m === 'popular') setSortedArticles((sortedArticles()).sort(byRating))
    if (m === 'reacted') setSortedArticles((sortedArticles()).sort(byReacted))
    else setSortedArticles((sortedArticles()).sort(byViewed))
  })

  const title = createMemo(() => {
    const m = mode()
    if (m === 'fresh') return t('Top recent')
    // if (m === 'popular') return t('Top rated')
    if (m === 'reacted') return t('Top discussed')
    return t('Top viewed')
  })

  useRouteReadyState()

  return (
    <div class='topic-page container'>
      <Show when={!data.loading}>
        <TopicFull topic={topic() as Topic} />
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

        <div class='row floor floor--important'>
          <div class='container'>
            <div class='row'>
              <h3 class='col-12'>{title()}</h3>
              <For each={sortedArticles().slice(0,6)}>
                {(a: Partial<Shout>) => (
                  <div class='col-md-6'>
                    <ArticleCard article={a} />
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>

        <div class='row'>
          <Show when={data.stage && sortedArticles().length > 5}>
            <Beside
              title={t('Topic is supported by')}
              values={topicAuthors()}
              beside={sortedArticles()[6]}
              wrapper={'author'}
            />
            <Row3 articles={sortedArticles().slice(6, 9)} />
            <Row2 articles={sortedArticles().slice(9, 11)} />
            <Row3 articles={sortedArticles().slice(11, 14)} />
            <Row3 articles={sortedArticles().slice(14, 17)} />
            <Row3 articles={sortedArticles().slice(17, 20)} />
          </Show>
        </div>
      </Show>
    </div>
  )
}

export default TopicPage
