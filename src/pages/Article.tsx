import { Component, createEffect, createSignal, Show } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { Shout } from '../graphql/types.gen'
import '../styles/Article.scss'
import FullArticle from '../components/Article/Full'
// import LoadingBar from 'solid-top-loading-bar'
import { ZineState } from '../context/zine'
import { loaded } from '../context/_api'

export const ArticlePage: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  useRouteReadyState()
  const [article,setArticle] = createSignal()
  createEffect(() => {
    if (loaded().length > 1) setArticle(data?.articles[data.args?.slug || ''])
    else if (data.args?.slug) {
      try { import('../../content/' + data.args.slug + '.mdx').then(v => {
        console.debug(v)
        const a = { ...v.default}
        setArticle(a as Partial<Shout>)
      }) } catch(e) { console.error(e) }
    }
  })
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
