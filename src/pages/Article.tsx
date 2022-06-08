import { Component, Show } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Comment, Shout, Topic } from '../graphql/types.gen'
import './Article.scss'
import FullArticle from '../components/Article/Full'
import PageLoadingBar from '../components/LoadingBar'

export const ArticlePage: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<{
    loading: boolean
    slug: string
    article: Partial<Shout>
    topics: Topic[]
    topicsLoading: boolean
    comments?: Comment[]
  }>()

  useRouteReadyState()

  return (
    <div class='shout'>
      <PageLoadingBar active={data.loading && data.topicsLoading}/>
      <Show
        fallback={<div class='center'>{t('Loading')}</div>}
        when={!data.loading && Boolean(data.article)}>
        <FullArticle article={data.article} comments={data.comments} />
      </Show>
    </div>
  )
}

export default ArticlePage
