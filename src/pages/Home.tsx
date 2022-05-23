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
import Hero from '../components/Discours/Hero';
import Beside from "../components/Article/Beside";
import RowShort from "../components/Article/RowShort";
import Slider from "../components/Article/Slider";
import Group from "../components/Article/Group";
import PageLoadingBar from '../components/LoadingBar'
import { useI18n } from '@solid-primitives/i18n'
import { Maybe } from 'graphql/jsutils/Maybe'
import { Shout, User, Topic } from '../graphql/types.gen'
import { shuffle } from '../utils'
import { byViews } from '../utils/by'

export const Home: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<HomeRouteData>()
  useRouteReadyState()

  const [loaded, setLoaded] = createSignal(false)
  const [byTopic, setByTopic] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [byLayout, setByLayout] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [topTopics, setTopTopics] = createSignal([] as Topic[])
  const [topAuthors, setTopAuthors] = createSignal([] as Partial<User>[])
  const [topCommented, setTopCommented] = createSignal([] as Partial<Shout>[])
  createEffect(() => {
    if(!loaded() && !data.topicsLoading && !data.loading) {
      
      console.log('[data] processing tops...')
      let tt = new Set([] as Topic[])
      let ta = new Set([] as Partial<User>[])
      data.topMonth.forEach(
        (s: Partial<Shout>) => {
          tt = new Set(Array.from(tt).concat(...s.topics as Topic[]))
          ta = new Set(Array.from(ta).concat(...s.authors as Partial<User>[]))
        }
      )
      const rtt = Array.from(tt).sort(byViews).slice(0,3)
      const rta = Array.from(ta).slice(0,3) // TODO: author.stat 
      setTopTopics(rtt)
      setTopAuthors(rta) 
      console.debug(rta)
      console.log('[ready] top month authors and topics')
      const all = [
        ...Array.from(data.topMonth),
        ...Array.from(data.topOverall),
        ...Array.from(data.topRecent)
      ]
      all.forEach((s: Partial<Shout>) => {
        // by topic
        s.topics?.forEach((t: Maybe<Topic>) => {
          if (!byTopic()[t?.slug || '']) byTopic()[t?.slug || ''] = []
          let updated = byTopic()[t?.slug || '']
          updated.push(s)
          setByTopic({ ...byTopic(), ...{[t?.slug as string]: updated } })
        })
        // by layout
        const l = s.layout || 'article'
        let updated: Partial<Shout>[] = byLayout()[l]
        if (!updated) {
          setByLayout({...byLayout(), ...{[l]: [] }})
          updated = []
        }
        updated.push(s)
        setByLayout({...byLayout(), ...{[l]: updated }})
      });
      // set top commented
      setTopCommented(
        all.sort(
          (a: Partial<Shout>, b: Partial<Shout>) => 
            (a.stat && b.stat) ? (b.stat.comments - a.stat.comments) : 0).slice(0,3)
        )
      setLoaded(true)
      console.log('[ready] all articles data postprocessed')
    }
  })

  const [someLayout, setSomeLayout] = createSignal([] as Partial<Shout>[])
  const [someTopics, setSomeTopics] = createSignal([] as Topic[])
  const [postloaded, setPostloaded] = createSignal(false)
  createEffect(() => {
    if(loaded() && !data.topicsLoading && !postloaded()) {
      // topics by slug
      let topicsdict: { [key:string]: Topic } = {}
      data.topics?.forEach((t: Topic) => topicsdict[t.slug] = t)
      // console.log(topicsdict)
      // random layout pick
      const ok = Object.keys(byLayout()).filter((l) => l !== 'article')
      const layout = shuffle(ok)[0]
      setSomeLayout(byLayout()[layout])
      console.log(`[ready] '${layout}' layout picked`)

      // random topics for navbar
      let topicSlugs = shuffle(Array.from(Object.entries(byTopic())))
        .filter(([, v], _i) => (v as Topic[]).length > 4)
        .slice(0,9)
        .map((f) => f[0])
      // console.log(topicSlugs)
      setSomeTopics(topicSlugs.map((s: string) => topicsdict[s]))
      console.log(`[ready] topics navbar data prepared`)
      setPostloaded(true)
    }
  })

  const [ready, setReady] = createSignal(false)
  createEffect(() => {
    if(loaded() && postloaded() && !ready()) {
        console.debug(topAuthors())
        console.info('[ready] loaded' )
        setReady(true)
      }
  })
  return (
    <main class='home'>
      <PageLoadingBar active={!ready()} />
      <Show when={ready()}>
        <Show when={someTopics()?.length === 9}>
          <NavTopics topics={someTopics()} />
        </Show>
        <Row5 articles={data.topRecent.slice(0, 5)} />
        <Hero/>
        <Suspense>
          <Beside 
            beside={data.topRecent[5]}
            top={false}
            title={t('Top viewed')}
            values={topTopics()}
            wrapper={'topic'} 
          />
        </Suspense>
        <Row3 articles={data.topRecent.slice(6, 9)} />

        <Suspense>
          <Beside 
            top={true}
            beside={data.topRecent[9]}
            title={t('Top month authors')}
            values={topAuthors()}
            wrapper={'author'}
          />
        </Suspense>
        <Slider title={t('Top month articles')} articles={data.topRecent.slice(10, 18)}/>
        <Row2 articles={data.topRecent.slice(18, 20)} />
        <RowShort articles={data.topRecent.slice(20, 24)} />
        <Row1 article={data.topRecent[24]} />
        <Row3 articles={data.topRecent.slice(25, 28)} />
        <h2>{t('Top commented')}</h2>
        <Row3 articles={topCommented()} />
        <Suspense>
          <Group articles={someLayout()} />
        </Suspense>
        <Slider title={t('Favorite')} articles={data.topRecent.slice(28, 30)}/>

        <Suspense>
          <Beside 
            top={false} 
            beside={data.topRecent[30]}
            title={t('Top month topics')}
            values={topTopics()}
            wrapper={'topic'}
          />
        </Suspense>
        <Row3 articles={data.topRecent.slice(31, 34)} />
        <Group articles={data.topRecent.slice(34, 42)}/>
        <Banner/>
      </Show>
    </main>
  )
}

export default Home
