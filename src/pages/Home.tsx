import { createEffect, createMemo, createSignal, Show, Suspense } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import Banner from '../components/Discours/Banner'
import NavTopics from '../components/Nav/Topics'
import Row5 from '../components/Article/Row5'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Row1 from '../components/Article/Row1'
import { ZineState } from '../context/zine'
import Hero from '../components/Discours/Hero'
import Beside from '../components/Article/Beside'
import RowShort from '../components/Article/RowShort'
import Slider from '../components/Article/Slider'
import Group from '../components/Article/Group'
import { useI18n } from '@solid-primitives/i18n'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Shout, User, Topic } from '../graphql/types.gen'
import { shuffle } from '../utils'
import { byComments, byViews } from '../utils/sortby'
import Icon from '../components/Nav/Icon'
import LoadingBar from 'solid-top-loading-bar'
import { loaded } from '../context/_api'

export const Home = () => {
  const [t] = useI18n()
  const data = useRouteData<ZineState>()
  const [topTopics, setTopTopics] = createSignal([] as Partial<Topic>[])
  const [topViewed, setTopViewed] = createSignal([] as Partial<Shout>[])
  const [topAuthors, setTopAuthors] = createSignal([] as Partial<User>[])
  const [topCommented, setTopCommented] = createSignal([] as Partial<Shout>[])
  const [someLayout, setSomeLayout] = createSignal([] as Partial<Shout>[])
  const [someTopics, setSomeTopics] = createSignal([] as Partial<Topic>[])
  const [selectedLayout, setSelectedLayout] = createSignal('article')
  const [byLayout, setByLayout] = createSignal({} as { [layout:string]:  Partial<Shout>[] })
  const [byTopic, setByTopic] = createSignal({} as { [topic:string]: Partial<Shout>[] })

  createEffect(() => {
    if('topMonth' in loaded()) {
        console.log('[home] preparing top month authors and topics')
        console.debug(data)
        // top authors and topics
        let tm = data.topMonth
        let tt = new Set([] as Topic[])
        let ta = new Set([] as Partial<User>[])
        tm.forEach((s: Partial<Shout>) => {
          tt = new Set(Array.from(tt).concat(s.topics as Topic[]))
          ta = new Set(Array.from(ta).concat(s.authors as Partial<User>[]))
        })
        setTopViewed(tm.sort(byViews).slice(0, 5))
        setTopTopics(Array.from(tt).sort(byViews).slice(0, 5))
        setTopAuthors(Array.from(ta).slice(0, 5)) // TODO: author.stat
        console.log('[home] top month authors and topics are ready')
      } else {
        console.debug('[home] data change', data)
      }
    }, [data])

    createEffect(() => {
      if('recentPublished' in loaded()) {
        console.log('[home] preparing published articles...')
        // get shouts lists by
        let bl: { [key: string]: Partial<Shout>[] } = {}
        let bt: { [key: string]: Partial<Shout>[] } = {}

        data['recentPublished'].forEach((s: Partial<Shout>) => {
          // by topic
          s.topics?.forEach((tpc: Maybe<Topic>) => {
            if (!bt[tpc?.slug || '']) bt[tpc?.slug || ''] = []
            bt[tpc?.slug as string].push(s)
          })
          // by layout
          const l = s.layout || 'article'
          if (!bl[l]) bl[l] = []
          bl[l].push(s)
        })
        setByLayout(bl)
        setByTopic(bt)
        // set top commented
        setTopCommented(data['recentPublished'].sort(byComments).slice(0, 3))
        console.log('[home] grouped by layout and by topic and top commented are ready')
      }
    }, [data])

    createEffect(() => {
      if(Object.keys(byLayout()).length > 0) {
        // random layout pick
        const ok = Object.keys(byLayout()).filter((l) => l !== 'article')
        const layout = shuffle(ok)[0]
        setSomeLayout(byLayout()[layout])
        setSelectedLayout(layout)
        console.log(`[ready] '${layout}' layout picked`)
        console.log('[home] picking random topics')
        // random topics for navbar
        setSomeTopics((_) => {
          const nv = Array.from(Object.entries(byTopic())).filter(([, v], _i) => (v as Partial<Topic>[]).length > 4)
          console.log(`[ready] topics navbar data prepared`)
          return nv.map((f) => (data.topics || {})[f[0]]).slice(0, 12)
        })
      }
    }, [data])

  useRouteReadyState()
  const progress = createMemo(() => data.loadcounter/5)
  return (
    <main class="home">
      <LoadingBar progress={progress()} />
      <Show when={!data.loading && 'recentPublished' in data}>
        <NavTopics topics={someTopics()} />
        <Row5 articles={data['recentPublished']?.slice(0, 5) as []} />
        <Hero />
        <Beside
          beside={data['recentPublished'].slice(5, 6)[0] as Partial<Shout>}
          title={t('Top viewed')}
          values={topViewed()}
          wrapper={'top-article'}
        />
        <Row3 articles={data['recentPublished'].slice(6, 9) as []} />
        <Beside
          beside={data['recentPublished'].slice(9, 10)[0] as Partial<Shout>}
          title={t('Top authors')}
          values={topAuthors()}
          wrapper={'author'}
        />
        <Slider title={t('Top month articles')} articles={data['recentPublished'].slice(10, 18) as []} />
        <Row2 articles={data['recentPublished'].slice(18, 20) as []} />
        <RowShort articles={data['recentPublished'].slice(20, 24) as []} />
        <Row1 article={data['recentPublished'].slice(24, 25)[0] as Partial<Shout>} />
        <Row3 articles={data['recentPublished'].slice(25, 28) as []} />

        <Row3 articles={topCommented()} header={<h2>{t('Top commented')}</h2>} />
        <Group
          articles={someLayout()}
          header={
            <div class='layout-icon'>
              <Icon name={selectedLayout()} />
            </div>
          }
        />
        <Slider title={t('Favorite')} articles={data['recentPublished'].slice(28, 30) as []} />

        <Suspense>
          <Beside
            beside={data['recentPublished'].slice(30, 31)[0] as Partial<Shout>}
            title={t('Top topics')}
            values={topTopics()}
            wrapper={'topic'}
            isTopicCompact={true}
          />
        </Suspense>
        <Row3 articles={data['recentPublished'].slice(31, 34) as []} />
        <Banner />
      </Show>
    </main>
  )
}

export default Home
