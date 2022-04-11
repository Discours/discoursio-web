import { createSignal, For, Show } from 'solid-js'
import { Topic } from '../graphql/types.gen'
import TopicCard from '../components/Topic/Card'
import './AllTopics.scss'
import { useI18n } from '@solid-primitives/i18n'
import { useStore } from '../store'

export default () => {
  const [{ topics, topicsSubscribed }, { toggleTopic }] = useStore()
  const [mode, setMode] = createSignal('views')

  let topicsGroupedByAlphabet: { [key: string]: Topic[] } = {}

  const groupBy = (arr: any[]) => {
    let firstLetter = null

    return arr.reduce(
      (acc: { [x: string]: Partial<Topic>[] }, t: Partial<Topic>) => {
        let currentLetter: string = t.title?.slice(0, 1) || '0'

        if (/[a-zA-Z0-9]/.test(currentLetter)) {
          currentLetter = 'A-Z'
        } else if (!acc[currentLetter]) {
          firstLetter = currentLetter
          acc[firstLetter] = []
        }

        acc[currentLetter].push(t)

        return acc
      },
      { 'A-Z': [] }
    )
  }
  const [t] = useI18n()

  const sortedKeys = () => {
    return []
  }

  return (
    <>
      <div class='container'>
        <div class='row'>
          <div class='col-md-9'>
            <h1>Темы</h1>
            <p>
              {t(
                'Подпишитесь на интересующие вас темы, чтобы настроить вашу персональную\
            летну и моментально узнавать о новых публикациях и обсуждениях'
              )}
            </p>
          </div>
        </div>
        <div class='row'>
          <div class='col'>
            <ul class='view-switcher'>
              <li classList={{ selected: mode() === 'views' }}>
                <a href='#views' onClick={() => setMode('views')}>
                  По просмотрам
                </a>
              </li>
              <li classList={{ selected: mode() === 'shouts' }}>
                <a href='#shouts' onClick={() => setMode('shouts')}>
                  По публикациям
                </a>
              </li>
              <li classList={{ selected: mode() === 'alphabet' }}>
                <a href='#alphabet' onClick={() => setMode('alphabet')}>
                  По алфавиту
                </a>
              </li>
            </ul>
            <Show
              when={mode() === 'alphabet'}
              fallback={() => (
                <div class='stats'>
                  <Show when={topics}>
                    <For each={topics}>
                      {(topic: Partial<Topic>) => (
                        <TopicCard
                          topic={topic}
                          compact={false}
                          subscribed={topicsSubscribed && topicsSubscribed.includes(topic.slug || '')}
                        />
                      )}
                    </For>
                  </Show>
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
                            <div class='topic col-3'>
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
    </>
  )
}
