import { Component, createEffect, createSignal, Show, Suspense } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import Banner from '../components/Discours/Banner'
import NavTopics from '../components/Nav/Topics'
import Row5 from '../components/Article/Row5'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Row1 from '../components/Article/Row1'
import { HomeRouteData } from './Home.data'
import Hero from '../components/Discours/Hero'
import Beside from '../components/Article/Beside'
import RowShort from '../components/Article/RowShort'
import Slider from '../components/Article/Slider'
import Group from '../components/Article/Group'
import PageLoadingBar from '../components/LoadingBar'
import { useI18n } from '@solid-primitives/i18n'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Shout, User, Topic } from '../graphql/types.gen'
import { shuffle } from '../utils'
import { byViews } from '../utils/by'
import Icon from '../components/Nav/Icon'

export const Home: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<HomeRouteData>()
  const [loaded, setLoaded] = createSignal(false)
  const [topTopics, setTopTopics] = createSignal([] as Topic[])
  const [topViewed, setTopViewed] = createSignal([] as Partial<Shout>[])
  const [topAuthors, setTopAuthors] = createSignal([] as Partial<User>[])
  const [topCommented, setTopCommented] = createSignal([] as Partial<Shout>[])
  const [someLayout, setSomeLayout] = createSignal([] as Partial<Shout>[])
  const [someTopics, setSomeTopics] = createSignal([] as Topic[])
  const [selectedLayout, setSelectedLayout] = createSignal('article')
  createEffect(() => {
    if (!loaded() && !data.topicsLoading && !data.loading) {
      console.log('[data] processing...')

      // top authors and topics
      let tt = new Set([] as Topic[])
      let ta = new Set([] as Partial<User>[])
      data.topMonth.forEach((s: Partial<Shout>) => {
        tt = new Set(Array.from(tt).concat(s.topics as Topic[]))
        ta = new Set(Array.from(ta).concat(s.authors as Partial<User>[]))
      })
      setTopTopics(Array.from(tt).sort(byViews).slice(0, 5))
      setTopAuthors(Array.from(ta).slice(0, 5)) // TODO: author.stat
      console.log('[ready] top month authors and topics')
      const all = [
        ...Array.from(data.topMonth),
        ...Array.from(data.topOverall),
        ...Array.from(data.topRecent)
      ]
      setTopViewed(data.topRecent.sort(byViews).slice(0,5))

      // get shouts lists by
      let byLayout: { [key: string]: Partial<Shout>[] } = {}
      let byTopic: { [key: string]: Partial<Shout>[] } = {}
      all.forEach((s: Partial<Shout>) => {
        // by topic
        s.topics?.forEach((t: Maybe<Topic>) => {
          if (!byTopic[t?.slug || '']) byTopic[t?.slug || ''] = []
          byTopic[t?.slug as string].push(s)
        })
        // by layout
        const l = s.layout || 'article'
        if (!byLayout[l]) byLayout[l] = []
        byLayout[l].push(s)
      })

      // set top commented
      setTopCommented(
        all
          .sort((a: Partial<Shout>, b: Partial<Shout>) =>
            a.stat && b.stat ? b.stat.comments - a.stat.comments : 0
          )
          .slice(0, 3)
      )

      // topics by slug
      let topicsdict: { [key: string]: Topic } = {}
      data.topics?.forEach((t: Topic) => (topicsdict[t.slug] = t))
      console.log('[ready] all articles data postprocessed')

      // random layout pick
      const ok = Object.keys(byLayout).filter((l) => l !== 'article')
      const layout = shuffle(ok)[0]
      setSomeLayout(byLayout[layout])
      setSelectedLayout(layout)
      console.log(`[ready] '${layout}' layout picked`)

      // random topics for navbar
      let topicSlugs = shuffle(Array.from(Object.entries(byTopic)))
        .filter(([, v], _i) => (v as Topic[]).length > 4)
        .slice(0, 12)
        .map((f) => f[0])
      console.debug(topicSlugs)
      setSomeTopics(topicSlugs.map((s: string) => topicsdict[s]))
      console.log(`[ready] topics navbar data prepared`)
      setLoaded(true)
    }
  })
  
  useRouteReadyState()
  return (
    <main class='home'>
      <PageLoadingBar active={!loaded()} />
      <Show when={loaded()}>
        <NavTopics topics={someTopics()} />
        <Row5 articles={data.topRecent.slice(0, 5)} />
        <Hero />
        <Beside
          beside={data.topRecent.slice(5, 6)[0]}
          title={t('Top viewed')}
          values={topViewed()}
          wrapper={'top-article'}
        />
        <Row3 articles={data.topRecent.slice(6, 9)} />
        <Beside
          beside={data.topRecent.slice(9, 10)[0]}
          title={t('Top authors')}
          values={topAuthors()}
          wrapper={'author'}
        />
        <Slider title={t('Top month articles')} articles={data.topRecent.slice(10, 18)} />
        <Row2 articles={data.topRecent.slice(18, 20)} />
        <RowShort articles={data.topRecent.slice(20, 24)} />
        <Row1 article={data.topRecent.slice(24, 25)[0]} />
        <Row3 articles={data.topRecent.slice(25, 28)} />
        
        <Row3 articles={topCommented()} header={
          <h2>{t('Top commented')}</h2>
          } />
        <Group articles={someLayout()} header={
            <div class='layout-icon'>
              <Icon name={selectedLayout()} />
            </div>
          } />
        <Slider title={t('Favorite')} articles={data.topRecent.slice(28, 30)} />

        <Suspense>
          <Beside
            beside={data.topRecent.slice(30, 31)[0]}
            title={t('Top topics')}
            values={topTopics()}
            wrapper={'topic'}
          />
        </Suspense>
        <Row3 articles={data.topRecent.slice(31, 34)} />
        <Banner />
      </Show>
    </main>
  )
}

export default Home
