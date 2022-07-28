import { createEffect, createSignal, For, Show } from 'solid-js'
import { User } from '../graphql/types.gen'
import AuthorCard from '../components/Author/Card'
import '../styles/AllTopics.scss'
import { useI18n } from '@solid-primitives/i18n'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import { byShouts, byRating } from '../utils/sortby'
import { AuthorsState } from '../context/authors'
import LoadingBar from 'solid-top-loading-bar'
import { cache, loaded, loading } from '../context/_api'

export default () => {
  const [t] = useI18n()
  const data = useRouteData<AuthorsState>()
  const [mode, setMode] = createSignal(data.args?.by || 'shouts')
  const [sortedAuthors, setsortedAuthors] = createSignal<Partial<User>[]>(cache()['authorsAll'] || [])
  const [sortedKeys, setSortedKeys] = createSignal<string[]>()
  let authorsAbc: { [key: string]: Partial<User>[] } = {}
  
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
    if(sortedAuthors() === [] && cache()['authorsAll'] && cache()['authorsAll'].length > 0) {
      console.log('[AllAuthors] set sortedAuthors')
      setsortedAuthors(cache()['authorsAll']?.sort(byShouts))
    }
  })

  const sortAbc = () => {
    setMode('alphabet')
    authorsAbc = groupBy(sortedAuthors() as any[])
    setSortedKeys(Object.keys(authorsAbc).sort())
  }
  const sortShouts = () => {
    setMode('shouts')
    setsortedAuthors(cache()['authorsAll']?.sort(byShouts) as Partial<User>[])
  }
  const sortAuthors = () => {
    setMode('rating')
    setsortedAuthors(cache()['authorsAll']?.sort(byRating) as Partial<User>[])
  }
  createEffect(sortShouts, [cache()['authorsAll']])
  useRouteReadyState()
  return (
    <div class="all-topics-page">
      <LoadingBar color='black' progress={loaded().length > 0 ? 100 : 0} />
      <Show when={!loading()}>
        <div class="wide-container">
          <div class='shift-content'>
            <div class='row'>
              <div class='col-md-9 page-header'>
                <h1>{t('Authors')}</h1>
                <p>{t('Subscribe who you like to tune your personal feed')}</p>
              </div>
            </div>
            <div class='row'>
              <div class='col'>
                <ul class='view-switcher'>
                  <li classList={{selected: mode() === 'shouts'}}>
                    <a href='/authorslist?by=shouts' onClick={() => sortShouts()}>
                      {t('By shouts')}
                    </a>
                  </li>
                  <li classList={{selected: mode() === 'rating'}}>
                    <a href='/authorslist?by=rating' onClick={() => sortAuthors()}>
                      {t('By rating')}
                    </a>
                  </li>
                  <li classList={{selected: mode() === 'alphabet'}}>
                    <a href='/authorslist?by=alphabet' onClick={() => sortAbc()}>
                      {t('By alphabet')}
                    </a>
                  </li>
                </ul>
                <Show
                  when={mode() === 'alphabet'}
                  fallback={() => (
                    <div class='stats'>
                      <For each={sortedAuthors()}>
                        {(author: Partial<User>) => (
                          <AuthorCard
                            author={author}
                            compact={false}
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
                            <For each={authorsAbc[letter]}>
                              {(author: Partial<User>) => (
                                <div class='topic col-sm-6 col-md-3'>
                                  <div class='topic-title'>
                                    <a href={`/author/${author.slug}`}>{author.name}</a>
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
