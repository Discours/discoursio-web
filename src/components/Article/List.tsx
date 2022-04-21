import { For, Show, Suspense } from 'solid-js/web'
import { useStore } from '../../store'
import ArticleCard from './Card'
import OneWide from './Row1'
import Row2 from './Row2'
import Row3 from './Row3'
import { shuffle } from '../../utils'
import { createMemo, JSX } from 'solid-js'
import { Shout } from '../../graphql/types.gen'
import { useI18n } from '@solid-primitives/i18n'

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
  page?: number
  size?: number
}

export default (props: ArticleListProps) => {
  const [t] = useI18n()
  // currentPage, totalPagesCount, articles
  const [{token, currentUser}, { follow, unfollow}] = useStore()
  const handleMore = () => {
    // TODO: show more
    // TODO: load more articles
    // setTimeout(() => window.scrollTo(0, 0), 200)
  }

  return (
    <Suspense fallback={<div class='article-preview'>{t('Loading')}</div>}>
      <For each={[...Array(Math.floor(props.articles.length / 6)).keys()]}>
        {(x: number) => <Block6 articles={props.articles.slice(0, lim(6, props.articles.length))} />}
      </For>
      <Show when={props.page && props.page > 1}>
        {'[page navigation]'}
      </Show>
    </Suspense>
  )
}
