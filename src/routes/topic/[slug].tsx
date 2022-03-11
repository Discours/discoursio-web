import { createMemo, createSignal, For, onMount, Show } from 'solid-js'
import './one.scss'
import Beside from '~/components/Article/Beside'
import ArticleCard from '~/components/Article/Card'
// import ShoutFeed from '$lib/components/ShoutFeed.svelte'
// import Shouts2 from '$lib/components/Shouts2.svelte'
// import Shouts3 from '$lib/components/Shouts3.svelte'
// import ShoutWide from '$lib/components/ShoutWide.svelte'
import TopicFull from '~/components/Topic/Full'
import AuthorCard from '~/components/Author/Card'
import ArticleList from '~/components/Article/List'
import { RouteDataFunc } from 'solid-app-router'
import { useStore } from '~/store'
import Row3 from '~/components/Article/Row3'
import Row2 from '~/components/Article/Row2'

let slug

export const routeData: RouteDataFunc = ({ params }) => (slug = params.slug)

const by  = {
  'popular': (a,b) => b.stat.views - a.stat.views,
  'fresh': (a, b) =>
    new Date(b.publishedAt).getMilliseconds() -
    new Date(a.publishedAt).getMilliseconds(),
  'discuss': (a, b) => b.stat.comments - a.stat.comments

}

export default () => {
  const [mode, setMode] = createSignal('popular')
  const store = useStore()
  const { authors, topicArticles, topics } = store[0]
  let byTopic = {}

  topicArticles.forEach((a) => {
    let ttt = byTopic[a.mainTopic]

    if (!ttt) ttt = []

    ttt.push(a)
    byTopic[a.mainTopic] = ttt
  })

  const sorted = createMemo(() => topicArticles.sort(by[mode()]))
  const topic = createMemo(() => topics[slug])
  const topViewedAbout = () => {
    // TODO
    return []
  }
  const topAbout = () => {
    // TODO
    return []
  }

  onMount(() => setMode(window.location.hash))

return (
<>
  <TopicFull topic={topic()} />

  <div class="container">
    
    <div class="row topic__controls">

      <div class="col-md-8">
        <ul class="view-switcher">
          <li classList={{selected: mode() === 'fresh'}}>
            <button type="button" onClick={() => setMode('fresh')}>Свежее</button>
          </li>
          <li classList={{ selected: mode() === 'popular'}}>
            <button type="button" onClick={() => setMode('popular')}>Популярное</button>
          </li>
          <li classList={{ selected: mode() === 'discuss'}}>
            <button type="button" onClick={() => setMode('discuss')}>Обсуждаемое</button>
          </li>
        </ul>
      </div>
      <div class="col-md-4">
        <div class="mode-switcher">
          Показывать
          <span class="mode-switcher__control">Все публикации</span>
        </div>
      </div>

    </div>

    <div class="row">

      <ArticleList articles={sorted().slice(0, 6)}/>
      <Beside
        settings={{ title: "Тему поддерживают" }}
        values={Object.values(authors).slice(0, 5)}
        beside={sorted()[6]}
      />

      <div class="floor floor--important">
        <div class="container">
          <div class="row">
            <h3 class="col-12">Популярное</h3>
            <For each={topViewedAbout()}>
              {a => 
              <div class="col-md-6">
                <ArticleCard article={a} />
              </div>
              }
              </For>
          </div>
        </div>
      </div>

      <Row3 shouts={topicArticles.slice(10, 13)} />
      <Row3 shouts={topicArticles.slice(13, 16)} />

      <div class="floor floor--important">
        <div class="container">
          <div class="row">
            <h3 class="col-12">Избранное</h3>
            <For each={topAbout()}>
              {a => 
              <div class="col-md-4">
                <ArticleCard article={a} />
              </div>
              }
              </For>
          </div>
        </div>
      </div>

      <Row2 shouts={topicArticles.slice(0, 2)} />
      <Row3 shouts={topicArticles.slice(2, 5)} />
      <Row2 shouts={topicArticles.slice(5, 7)} />
    </div>
  </div>
</>
)}