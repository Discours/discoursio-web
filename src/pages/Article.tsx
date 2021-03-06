import { Component, createEffect, createMemo, createSignal, Show } from 'solid-js'
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
  const [ slug, setSlug ] = createSignal('')
  createEffect(() => {
    if(!data?.article) {
      setSlug(window.location.pathname.replace('/',''))
    }
  })
  useRouteReadyState()
  const [article,setArticle] = createSignal()
  createEffect(() => {
    if (!data.loading) setArticle(data?.article)
    else if (slug()) {
      try { import('../../content/' + slug() + '.mdx').then(v => {
        console.debug(v)
        const a = { ...v.default}
        setArticle(a as Partial<Shout>)
      }) } catch(e) { console.error(e) }
    }
  })
  return (
    <div class='article-page'>
      <PageLoadingBar active={data.loading && data.topicsLoading}/>
      <Show
        fallback={<div class='center'>{t('Loading')}</div>}
        when={!!article()}>
        <FullArticle article={article() as Partial<Shout>} comments={data.comments || []} />
      </Show>
    </div>
  )
}

export default ArticlePage
