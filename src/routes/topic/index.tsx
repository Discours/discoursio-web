
import { createSignal, onMount } from 'solid-js'
import { For, Show } from 'solid-js/web'
import TopicCard from '~/components/Topic/Card'
import { Topic } from '~/lib/graphql/types.gen'
import { useStore } from '~/store'
import './topics.scss'
export let update

let sortedKeys = []
let topicsGroupedByAlphabet = []

const groupBy = (arr) => {
  let firstLetter = null

  return arr.reduce(
    (acc, currentValue) => {
      let currentLetter = currentValue.title.slice(0, 1)

      if (/[a-zA-Z0-9]/.test(currentLetter)) {
        currentLetter = 'A-Z'
      } else if (!acc[currentLetter]) {
        firstLetter = currentLetter
        acc[firstLetter] = []
      }

      acc[currentLetter].push(currentValue)

      return acc
    },
    { 'A-Z': [] }
  )
}

export default () => {
  const store = useStore()
  const { topics, userTopics } = store[0]
  const [mode, setMode] = createSignal('views')
  const byMode = (a: Topic, b: Topic) => b.topicStat[mode()] - a.topicStat[mode()]

  const sortTopics = () => {
    if (mode() === 'alphabet') {
      topicsGroupedByAlphabet = groupBy(update.topicsAll.slice(0))
      sortedKeys = Object.keys(topicsGroupedByAlphabet).sort()
      sortedKeys.forEach((letter) => {
        topicsGroupedByAlphabet[letter] = topicsGroupedByAlphabet[letter].sort(
          // eslint-disable-next-line no-confusing-arrow
          (a, b) => ((a.title > b.title) ? 1 : (a.title < b.title) ? -1 : 0)
          )
        })
    }

    return Object.values(topics).sort(byMode)
  }

  onMount(sortTopics)

  return (
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <h1>Темы</h1>
          <p>
            Подпишитесь на интересующие вас темы, чтобы настроить вашу персональную
            летну и моментально узнавать о новых публикациях и обсуждениях
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <ul class="view-switcher">
            <li classList={{ selected: mode() === 'views' }}>
              <a href="#views" onClick={() => setMode('views')}>По просмотрам</a>
            </li>
            <li classList={{ selected: mode() === 'shouts' }}>
              <a href="#shouts" onClick={() => setMode('shouts')}>По публикациям</a
              >
            </li>
            <li classList={{ selected: mode() === 'alphabet' }}>
              <a href="#alphabet" onClick={() => setMode('alphabet')}>По алфавиту</a>
            </li>
          </ul>

          <Show when={mode() === 'alphabet'} fallback={
            <div class="stats">
              <For each={Array.from(topics)}>
                {(topic: Topic) => (
                  <TopicCard topic={topic} compact={false} subscribed={userTopics?.includes(topic.slug)} />
                )}
              </For>
            </div>
          }>
            <For each={sortedKeys}>
              {letter => (
                <div class="group">
                  <h2>{letter}</h2>
                  <div class="container">
                    <div class="row">
                      <For each={topicsGroupedByAlphabet[letter]}>
                        {(topic: Topic) => (
                          <div class="topic col-3">
                            <div class="topic-title">
                              <a href="/topic/{topic.slug}">{topic.title}</a>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </Show>
        </div>
      </div>
    </div>
  )
}
