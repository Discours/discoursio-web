import { Component, createMemo, Show } from 'solid-js'
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
  if(!data.article) 
  useRouteReadyState()
  const article = createMemo(() => {
    if (!data.loading) return data?.article
    else {
      ['article', 'image', 'video', 'prose', 'music'].forEach(layout => {
        const r = import('../../content/'+ layout + '/' + data.slug + '.mdx')
        if(r) return r
      }) 
    }
  })
  return (
    <div class='shout'>
      <PageLoadingBar active={data.loading && data.topicsLoading}/>
      <Show
        fallback={<div class='center'>{t('Loading')}</div>}
        when={!!article()}>
        <FullArticle article={article()} comments={data.comments || []} />
      </Show>
    </div>
  )
}

export default ArticlePage
