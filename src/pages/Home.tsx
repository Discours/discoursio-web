import { Component, createEffect, createSignal, Show, Suspense } from 'solid-js'
import { useRouteData } from 'solid-app-router'
import { useRouteReadyState } from '../utils/routeReadyState'
import Banner from '../components/Discours/Banner'
import { Maybe, Shout, Topic, User } from '../graphql/types.gen'
import NavTopics from '../components/Nav/Topics'
import { shuffle } from '../utils/index'
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

export const Home: Component = () => {
  const [t] = useI18n()
  const data = useRouteData<HomeRouteData>()
  // articles data
  const [loaded, setLoaded] = createSignal(false)
  const [byTopic, setByTopic] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [byLayout, setByLayout] = createSignal<{ [key: string]: Partial<Shout>[] }>({})
  const [topTopics, setTopTopics] = createSignal<Set<Topic>>(new Set([]))
  const [topAuthors, setTopAuthors] = createSignal<Set<Partial<User>>>(new Set([]))
  createEffect(() => {
    if(!data.loading && !loaded()) {
      // prepared data structures
      data.topMonth?.forEach((s: Partial<Shout>) => {
        setTopTopics(new Set([...topTopics(), ...s.topics as Topic[]]))
        setTopAuthors(new Set([...topAuthors(), ...s.authors as Partial<User>[]]))
      });
      ([...data.topMonth, ...data.topRecent, ...data.topOverall]).forEach((s: Partial<Shout>) => {
        s.topics?.forEach((t: Maybe<Topic>) => {
          if (!byTopic()[t?.slug || '']) byTopic()[t?.slug || ''] = []
          let updated = byTopic()[t?.slug || '']
          updated.push(s)
          setByTopic({ ...byTopic(), ...{[t?.slug as string]: updated } })
        })
        let updated: Partial<Shout>[] = byLayout()[s.layout || 'article']
        if (!updated) {
          setByLayout({...byLayout(), ...{[s.layout || 'article']: [] }})
          updated = []
        }
        updated.push(s)
        setByLayout({...byLayout(), ...{[s.layout as string || 'article']: updated }})
      });
      setLoaded(true)
      console.log('mainpage: articles data loaded')
    }
  })

  // random layout pick
  const [randomLayout, setRandomLayout] = createSignal('article')
  createEffect(()=>{
    const ok = Object.keys(byLayout()).filter((l) => l !== 'article')
    if(ok.length > 0 && randomLayout() === 'article') {
      const layout = shuffle(ok)[0]
      setRandomLayout(layout)
      console.log(`mainpage: ${layout} picked`)
    }
  })

  // top 3 commented articles
  const [topCommented, setTopCommented] = createSignal([] as Partial<Shout>[])
  createEffect(()=>{
    if(loaded() && topCommented() === []) {
      setTopCommented([...data.topRecent, ...data.topMonth, ...data.topOverall].filter((s: Partial<Shout>) => s.stat && s.stat.comments > 0)
        .sort((a: Partial<Shout>, b: Partial<Shout>) => (a.stat && b.stat) ? (b.stat.comments - a.stat.comments) : 0)
        .slice(0,3))
      console.log(`mainpage: found top 3 commented`)
    }
  })

  // some (9) topics for navigation
  const [someTopics, setSomeTopics] = createSignal([] as Topic[])
  createEffect(() => {
    if(loaded() && someTopics() === []) {
      const st: Topic[] = shuffle(Array.from(Object.entries(byTopic())))
        .filter(([, v], _i) => (v as Topic[]).length > 4)
        .slice(0,9)
        .map((f) => f[0])
        .map((s: string) => data.topicsdict[s])
      setSomeTopics(st)
      console.log(`mainpage: topics`)
    }
  })

  useRouteReadyState()
  return (
    <main class='home'>
      <PageLoadingBar active={data.loading || data.topicsLoading} />
      <Show when={!data.loading && data.topMonth && data.topRecent && data.topOverall}>
        <Suspense>
          <NavTopics topics={someTopics() || []} />
        </Suspense>
        <Row5 articles={data.topRecent.slice(0, 5)} />
        <Hero/>
        <Beside beside={data.topRecent[5]} top={true} title={t('Top viewed')} values={topTopics()} wrapper={'article'}/>
        <Row3 articles={data.topRecent.slice(6, 9)} />
        <Beside 
          top={true}
          beside={data.topRecent[9]}
          title={t('Top month authors')}
          values={topAuthors()}
          wrapper={'author'}
          />
        <Slider title={t('Top month articles')} articles={data.topRecent.slice(10, 18)}/>
        <Row2 articles={data.topRecent.slice(18, 20)} />
        <RowShort articles={data.topRecent.slice(20, 24)} />
        <Row1 article={data.topRecent[24]} />
        <Row3 articles={data.topRecent.slice(25, 28)} />
        <h2>{t('Top commented')}</h2>
        <Row3 articles={topCommented()} />
        <Suspense>
          <Group articles={byLayout()[randomLayout()] || []} />
        </Suspense>
        <Slider title={t('Favorite')} articles={data.topRecent.slice(28, 30)}/>
        <Beside 
          top={true} 
          beside={data.topRecent[30]}
          title={t('Top month topics')}
          values={topTopics()}
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
