import { Component, createEffect, createSignal, Show } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout } from '../graphql/types.gen'
import '../styles/Article.scss'
import FullArticle from '../components/Article/Full'
// import LoadingBar from 'solid-top-loading-bar'
import { ZineState } from '../context/zine'
import { handleUpdate, loaded } from '../context/_api'
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
  const [article,setArticle] = createSignal<Partial<Shout>>()
  createEffect(() => {
    if (loaded().includes('getShoutBySlug') && !article()?.slug) setArticle(data?.articles[data.params?.slug || ''])
    /*else if (data.args?.slug) {
      try { import('../../content' + data.args.slug + '.mdx').then(v => {
        console.debug(v)
        const a = { ...v.default}
        setArticle(a as Partial<Shout>)
      }) } catch(e) { console.error(e) }
    }*/
    else if(!!data.params?.slug && !article()?.slug) {
      promiseQuery(shoutBySlug, { slug: data.params?.slug }).then(handleUpdate).then(() => setArticle(data.articles[data.params?.slug || '']))
    }
  }, [loaded()])
  return (
    <div class='article-page'>
      <Show
        fallback={<div class='center'>{t('Loading')}</div>}
        when={!!article()}>
        <FullArticle article={article() as Partial<Shout>} comments={data['commentsBySh'] || []} />
      </Show>
    </div>
  )
}

export default ArticlePage
