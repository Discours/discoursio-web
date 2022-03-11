import './index.css'
import { Show, createSignal } from 'solid-js'
import DiscoursFooter from '~/components/Discours/Footer'
import NavHeader from '~/components/Nav/Header'
import ArticleList from '~/components/Article/List'
import ArticleSlider from '~/components/Article/Slider'
import NavTopics from '~/components/Nav/Topics'
import { shuffle } from '~/lib/utils'

import { createComputed, useTransition } from 'solid-js'
import { useStore } from '~/store'
import { Shout as Article } from '~/lib/graphql/types.gen'
let actions
let state

export default () => {
  const store = useStore()
  const [_, start] = useTransition()
  const [topicset, setTopicset] = createSignal(new Set())

  const handleSetPage = (page) => {
    start(async () => {
      actions.setPage(page)
      await actions.loadArticles() // default recent
    })
  }

  // eslint-disable-next-line solid/reactivity
  createComputed(async () => {
    if(store) {

      actions = store[1]
      state = store[0]
      await actions.loadArticles()
      const all = [...state.recent, ...state.topOverall, ...state.topMonth, ...state.topViewed]
  
      all.forEach((a: Article) => {
        a.topics.forEach((t) => {
          const ttt = topicset()
  
          ttt.add(t)
          setTopicset(ttt)
        })
      })
    }
  })

  return (
    <>
      <NavHeader />
      <Show when={state?.recent.length > 0} fallback={<div>Загрузка...</div>}>
        <NavTopics topics={shuffle(Array.from(topicset())).slice(0, 9)} />
        <ArticleList articles={state.recent} onSetPage={handleSetPage} totalPagesCount={1} currentPage={0} />
        <ArticleSlider articles={state.topOverall} title={`Избранное`} />
      </Show>
      <DiscoursFooter />
    </>
  )
}
