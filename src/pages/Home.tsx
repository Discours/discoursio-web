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

export const Home: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<HomeRouteData>()

  const [loaded, setLoaded] = createSignal(false)
  const [byTopic, setByTopic] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [byLayout, setByLayout] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [topTopics, setTopTopics] = createSignal<Set<Topic>>(new Set([]))
  const [topAuthors, setTopAuthors] = createSignal<Set<Partial<User>>>(new Set([]))
  const [topCommented, setTopCommented] = createSignal([] as Partial<Shout>[])
  createEffect(() => {
    if(!loaded() && !data.loading) {
      let tt = new Set()
      let ta = new Set()
      data.topMonth.forEach((s: Partial<Shout>) => {
        // tops
        s.topics?.forEach((t) => tt.add(t))
        s.authors?.forEach(a => ta.add(a))
      })
      setTopTopics(tt as Set<Topic>)
      setTopAuthors(ta as Set<User>)
      console.log('[data] top authors and topics found')
      const all = [
        ...data.topMonth,
        ...data.topOverall,
        ...data.topRecent
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
      setTopCommented(
        all.sort(
          (a: Partial<Shout>, b: Partial<Shout>) => 
            (a.stat && b.stat) ? (b.stat.comments - a.stat.comments) : 0)
        )
      setLoaded(true)
      console.log('[data] all articles postprocessed')
    }
  })

  const [someLayout, setSomeLayout] = createSignal([] as Partial<Shout>[])
  const [someTopics, setSomeTopics] = createSignal([] as Topic[])
  const [postloaded, setPostloaded] = createSignal(false)
  createEffect(() => {
    if(loaded() && !data.topicsLoading && !postloaded() && Object.keys(byLayout()).length !== 0) {
      let topicsdict: { [key:string]: Topic } = {}
      data.topics.forEach((t: Topic) => { topicsdict[t.slug] = t })
      // random layout pick
      const ok = Object.keys(byLayout()).filter((l) => l !== 'article')
      const layout = shuffle(ok)[0]
      setSomeLayout(byLayout()[layout])
      console.log(`[data] '${layout}' layout picked`)
      // random topics for navbar
      const st: Topic[] = shuffle(Array.from(Object.entries(byTopic())))
        .filter(([, v], _i) => (v as Topic[]).length > 4)
        .slice(0,9)
        .map((f) => f[0])
        .map((s: string) => topicsdict[s])
      setSomeTopics(st)
      console.log(`[data] topics navbar prepared`)
      setPostloaded(true)
    }
  })
  useRouteReadyState()
  return (
    <main class='home'>
      <PageLoadingBar active={data.loading || data.topicsLoading} />
      <Show when={!data.loading && data.topMonth && data.topRecent && data.topOverall}>
        <Show when={postloaded()}>
          <NavTopics topics={someTopics()} />
        </Show>
        <Row5 articles={data.topRecent.slice(0, 5)} />
        <Hero/>
        <Beside 
          beside={data.topRecent[5]}
          top={true}
          title={t('Top viewed')}
          values={Array.from(topTopics()).slice(0,3)}
          wrapper={'article'} 
        />
        <Row3 articles={data.topRecent.slice(6, 9)} />
        <Beside 
          top={true}
          beside={data.topRecent[9]}
          title={t('Top month authors')}
          values={Array.from(topAuthors()).slice(0,3)}
          wrapper={'author'}
        />
        <Slider title={t('Top month articles')} articles={data.topRecent.slice(10, 18)}/>
        <Row2 articles={data.topRecent.slice(18, 20)} />
        <RowShort articles={data.topRecent.slice(20, 24)} />
        <Row1 article={data.topRecent[24]} />
        <Row3 articles={data.topRecent.slice(25, 28)} />
        <h2>{t('Top commented')}</h2>
        <Row3 articles={(topCommented()).slice(0,3)} />
        <Suspense>
          <Group articles={someLayout()} />
        </Suspense>
        <Slider title={t('Favorite')} articles={data.topRecent.slice(28, 30)}/>
        <Beside 
          top={true} 
          beside={data.topRecent[30]}
          title={t('Top month topics')}
          values={Array.from(topTopics()).slice(0,3)}
          wrapper={'topic'}
          />
        <Row3 articles={data.topRecent.slice(31, 34)} />
        <Group articles={data.topRecent.slice(34, 42)}/>
        <Banner/>
      </Show>
    </main>
  )
}

export default Home
