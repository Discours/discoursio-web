import { Component, createEffect, createMemo, createSignal, Show } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout } from '../graphql/types.gen'
import '../styles/Article.scss'
import FullArticle from '../components/Article/Full'
// import LoadingBar from 'solid-top-loading-bar'
import { ZineState } from '../context/zine'
import { cache, handleUpdate } from '../context/_api'
import { AuthorPage } from './Author'
import { TopicPage } from './Topic'
import { usePromiseQuery } from '../utils/promiseQuery'
import { useClient } from 'solid-urql'
import shoutBySlug from '../graphql/q/article-by-slug'

export const ArticlePage: Component = () => {
  const data = useRouteData<ZineState>()
  const [promiseQuery, ] = usePromiseQuery(useClient())
  if (data.params?.slug?.startsWith('@')) return <AuthorPage />
  else if (data.params?.slug?.startsWith(':')) return <TopicPage />
  const [t] = useI18n()
  useRouteReadyState()
  const slug = createMemo(() => data.params?.slug)
  const [article,setArticle] = createSignal<Partial<Shout>>()
  createEffect(() => {
    if(slug() && 'articles' in cache()) {
      console.log('[article] loading... ', slug())
      promiseQuery(shoutBySlug, { slug: slug() })
        .then(handleUpdate)
        .then(() => {
          setArticle(cache()['articles'][slug()])
          console.debug('[article] loaded', cache()['articles'][slug()])
        })
    }
  }, [cache()])
  return (
    <div class='article-page'>
      <Show
        fallback={<div class='center'>{t('Loading')}</div>}
        when={!!article()}>
        <FullArticle article={article() as Partial<Shout>} reactions={cache()['reactionsByShout'] || []} />
      </Show>
    </div>
  )
}

export default ArticlePage
