import { For, Show, Suspense } from 'solid-js/web'
import { useStore } from '~/store'
import ArticleCard from './Card'
import OneWide from "./Row1";
import Row2 from "./Row2";
import Row3 from "./Row3";
import { shuffle } from "~/lib/utils";
import { createMemo, JSX } from "solid-js";

const ccc = [OneWide, Row2, Row3]

export const Block6 = (props) => {
    const dice = createMemo(() => shuffle([ccc]))

    return (<>
        <For each={dice()}>
            {(c: (ppp) => JSX.Element) => c({ articles: props.articles }) }
        </For>
    </>)
}
// eslint-disable-next-line no-confusing-arrow
const lim = (n: number, by: number) => (n > by ? by : n)

export default (props) => { // currentPage, totalPagesCount, articles
  const store = useStore()
  const { token } = store[0]
  const { unlike, like } = store[1]
  const handleClickLike = (article, e) => {
    e.preventDefault()
    article.liked ? unlike(article.slug) : like(article.slug)
  }
  const handlePage = (v, e) => {
    e.preventDefault()
    props.onSetPage(v)
    setTimeout(() => window.scrollTo(0, 0), 200)
  }

  return (
    <Suspense fallback={
      <div class='article-preview'>Загрузка публикаций...</div>
      }>
      <For each={[...Array(Math.floor(props.articles.length / 6)).keys()]}>
        {(article) => <Block6 article={props.articles.slice(0, lim(6, props.articles))} settings={{}} />}
      </For>
      <Show when={props.totalPagesCount > 1}>
        <nav>
          <ul class='pagination'>
            <For each={[...Array(props.totalPagesCount).keys()]}>
              {(v) => (
                <li
                  class='page-item'
                  classList={{ active: props.currentPage === v }}
                  onClick={[handlePage, v]}
                >
                  <a class='page-link' href='' textContent={v + 1} />
                </li>
              )}
            </For>
          </ul>
        </nav>
      </Show>
    </Suspense>
  )
}
