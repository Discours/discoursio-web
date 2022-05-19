import { Component, Show, For, createEffect } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
// import { useAppContext } from '../AppContext'
import { Community, Shout, Topic, User } from '../graphql/types.gen'
import Row2 from '../components/Article/Row2'
import Row1 from '../components/Article/Row1'
import Row3 from '../components/Article/Row3'
import Beside from '../components/Article/Beside'
import ArticleCard from '../components/Article/Card'
import { byRating, byShouts, byViews } from '../utils/by'

// FIXME
export const BlogAuthor: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    authorLoading: boolean
    params: { [key:string]: string }
    author: Partial<User>
    communities?: { [id: string]: Partial<Community> }
    articles?: Partial<Shout>[]
    articlesLoading?: boolean
    topics: Topic[]
    topicsLoading: boolean
  }>()
  let authorTopics: Topic[] = []
  let topRated: Partial<Shout>[] = []
  let topViewed: Partial<Shout>[] = []
  useRouteReadyState()
  createEffect(() => {
    if(!topRated && !!data.articles) {
      topRated = Array.from(data.articles || []).sort(byRating)
      topViewed = Array.from(data.articles || []).sort(byViews)
    }
  })
  return (
    <>
    <Show when={!data.articlesLoading}>
      <Row1 article={data.articles?.at(0) as Partial<Shout>} />
      <Row3 articles={data.articles?.slice(1, 4) as Partial<Shout>[]} />
      <Row2 articles={data.articles?.slice(4, 6) as Partial<Shout>[]} />
      <Show when={!data.authorLoading}>
        <Beside
          title={t('Favorite topics')}
          values={authorTopics?.sort(byShouts).slice(0, 5)}
          beside={data.articles?.at(6)}
          wrapper={'author'}
        />
      </Show>
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
      <Row3 articles={data.articles?.slice(10, 13) || []} />
      <Row3 articles={data.articles?.slice(13, 16) || []} />
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
      <Row2 articles={data.articles?.slice(0, 2) || []} />
      <Row3 articles={data.articles?.slice(2, 5) || []} />
      <Row2 articles={data.articles?.slice(5, 7) || []} />
    </Show>
    </>
  )
}

export default BlogAuthor
