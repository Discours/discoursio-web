import { createEffect, createMemo, createSignal, For, Show } from 'solid-js'
import { Topic } from '../graphql/types.gen'
import TopicCard from '../components/Topic/Card'
import '../styles/AllTopics.scss'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { byShouts, byViews } from '../utils/sortby'
import { useAuth } from '../store/auth'
import { ZineState } from '../store/zine'
import LoadingBar from 'solid-top-loading-bar'

export default () => {
  const [{ info }, {}] = useAuth()
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [mode, setMode] = createSignal(data.args?.by || 'views')
  const [sortedTopics, setSortedTopics] = createSignal<Partial<Topic>[]>(data['topicsAll'] || [])
  const [sortedKeys, setSortedKeys] = createSignal<string[]>([])
  let topicsGroupedByAlphabet: { [key: string]: Partial<Topic>[] } = {}
  
  const groupBy = (arr: any[]) => {
    let f = null
    return arr.reduce(
      (acc, tt) => {
        let c = tt.title.slice(0, 1)
        if (/[a-zA-Z0-9]/.test(c)) {
          c = 'A-Z'
        } else if (!acc[c]) {
          f = c
          acc[f] = []
        }
        acc[c].push(tt)
        return acc
      },
      { 'A-Z': [] }
    )
  }

  createEffect(() => {
    if(sortedTopics() === [] && data['topicsAll'] && data['topicsAll'].length > 0) {
      console.log('[AllTopics] set sortedTopics')
      setSortedTopics(data['topicsAll'].sort(byShouts))
    }
  })

  const sortAbc = () => {
    setMode('alphabet')
    topicsGroupedByAlphabet = groupBy(sortedTopics() as any[])
    setSortedKeys(Object.keys(topicsGroupedByAlphabet).sort())
  }
  const sortShouts = () => {
    setMode('shouts')
    setSortedTopics(data.topicslist?.sort(byShouts) as Partial<Topic>[])
  }
  const sortViews = () => {
    setMode('views')
    setSortedTopics(data.topicslist?.sort(byViews) as Partial<Topic>[])
  }

  useRouteReadyState()
  const progress = createMemo(() => data.loadcounter/5)
  return (
    <div class="all-topics-page">
      <LoadingBar progress={progress()} />
      <Show when={data.loadcounter}>
        <div class="wide-container">
          <div class='shift-content'>
            <div class='row'>
              <div class='col-md-9 page-header'>
                <h1>{t('Topics')}</h1>
                <p>{t('Subscribe what you like to tune your personal feed')}</p>
              </div>
            </div>
            <div class='row'>
              <div class='col'>
                <ul class='view-switcher'>
                  <li classList={{selected: mode() === 'views'}}>
                    <a href='/topics?by=views' onClick={() => sortViews()}>
                      {t('By views')}
                    </a>
                  </li>
                  <li classList={{selected: mode() === 'shouts'}}>
                    <a href='/topics?by=shouts' onClick={() => sortShouts()}>
                      {t('By shouts')}
                    </a>
                  </li>
                  <li classList={{selected: mode() === 'alphabet'}}>
                    <a href='/topics?by=alphabet' onClick={() => sortAbc()}>
                      {t('By alphabet')}
                    </a>
                  </li>
                </ul>
                <Show
                  when={mode() === 'alphabet'}
                  fallback={() => (
                    <div class='stats'>
                      <For each={sortedTopics()}>
                        {(topic: Partial<Topic>) => (
                          <TopicCard
                            topic={topic}
                            compact={false}
                            subscribed={
                              info?.userSubscribedTopics &&
                              info?.userSubscribedTopics.includes(topic.slug || '')
                            }
                          />
                        )}
                      </For>
                    </div>
                  )}
                >
                  <For each={sortedKeys()}>
                    {(letter: string) => (
                      <div class='group'>
                        <h2>{letter}</h2>
                        <div class='container'>
                          <div class='row'>
                            <For each={topicsGroupedByAlphabet[letter]}>
                              {(topic: Partial<Topic>) => (
                                <div class='topic col-sm-6 col-md-3'>
                                  <div class='topic-title'>
                                    <a href={`/topic/${topic.slug}`}>{topic.title}</a>
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
        </div>
      </Show>
    </div>
  )
}
