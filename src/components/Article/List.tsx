import { For, Suspense } from 'solid-js/web'
import OneWide from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import { shuffle } from '../../utils'
import { createMemo, createSignal, JSX } from 'solid-js'
import { Shout } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'
import { useStore } from '../../store'
import './List.scss'

export const Block6 = (props: { articles: Partial<Shout>[] }) => {
  const dice = createMemo(() => shuffle([OneWide, Row2, Row3]))

  return (
    <>
      <For each={dice()}>{(c: (ppp: Partial<Shout>[]) => JSX.Element) => c(props.articles)}</For>
    </>
  )
}
// eslint-disable-next-line no-confusing-arrow
const lim = (n: number, by: number) => (n > by ? by : n)

interface ArticleListProps {
  articles: Partial<Shout>[]
  page: number
  size: number
}

export default (props: ArticleListProps) => {
  const [t] = useI18n()
  const [articles, setArticles] = createSignal(
    props.articles.slice(props.page * props.size, props.size * (props.page + 1)) || []
  )
  const [loadingMore, setLoadingMore] = createSignal(false)
  const [, { more }] = useStore()
  const handleMore = () => {
    setArticles(props.articles.slice(props.page * props.size, props.size * (props.page + 1)))
    if (props.size * (props.page + 1) > props.articles.length) {
      console.log('articles: load more')
      setLoadingMore(true)
      more()
      setLoadingMore(false)
    }
  }

  return (
    <Suspense fallback={<div class='article-preview'>{t('Loading')}</div>}>
      <For each={[...Array(Math.floor(articles().length / 6)).keys()]}>
        {() => <Block6 articles={articles().slice(0, lim(6, articles().length))} />}
      </For>
      <a href={''} onClick={handleMore} classList={{ disabled: loadingMore() }}>
        {loadingMore() ? '...' : t('More')}
      </a>
    </Suspense>
  )
}
