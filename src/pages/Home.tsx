import { Component, createEffect, Show } from 'solid-js'
import { useRouteData } from 'solid-app-router'
// import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState'
import Banner from '../components/Discours/Banner'
import { Maybe, Shout, Topic, User } from '../graphql/types.gen'
import NavTopics from '../components/Nav/Topics'
import { shuffle } from '../utils/index'
import Row5 from '../components/Article/Row5'
import Row3 from '../components/Article/Row3'
import Row2 from '../components/Article/Row2'
import Row1 from '../components/Article/Row1'
// import { useStore } from '../store'
import { HomeRouteData } from './Home.data'
import Hero from '../components/Discours/Hero';
import Beside from "../components/Article/Beside";
import RowShort from "../components/Article/RowShort";
import Slider from "../components/Article/Slider";
import Group from "../components/Article/Group";
import PageLoadingBar from '../components/LoadingBar'

export const Home: Component = () => {
  // const isRouting = useIsRouting();
  // const [t] = useI18n()
  const data = useRouteData<HomeRouteData>()
  // const [state, actions] = useStore()

  useRouteReadyState()

  // TODO: createSignal ? s
  let randomLayout = ''
  let randomTopics = [] as string[]
  let aslugs = new Set([] as string[])
  let topicset = new Set([] as Topic[])
  let authors = [] as Partial<User>[]
  let authorsBySlugs = {} as { [key: string]: Partial<User> }
  let bySlugs = {} as { [key: string]: Partial<Shout> }
  let byTopic = {} as { [key: string]: Partial<Shout>[] }
  let topMonthAuthors = [] as Partial<User>[]
  let topMonthTopics = [] as Topic[]
  let shoutsByTopic = {} as { [key: string]: Partial<Shout>[] }
  let shoutsByLayout = {} as { [key: string]: Partial<Shout>[] }
  let topCommented = [] as Partial<Shout>[]

  const postLoad = (s: Partial<Shout>): void => {
    if (s.slug) {
      bySlugs[s.slug] = s
      // stores all the authors
      s.authors?.forEach((a) => {
        aslugs.add(a.slug)

        if (data.topMonth.includes(s) && !topMonthAuthors.includes(a)) topMonthAuthors.push(a) // <9 top month only

        if (!(a.slug in authorsBySlugs)) {
          authors.push(a)
          authorsBySlugs[a.slug] = a
        }
      })
      // stores mentioned topics slugs
      s.topics?.forEach((t: Maybe<Topic>) => {
        if (t) {
          if (data.topMonth.includes(s) && !topMonthTopics.includes(t)) topMonthTopics.push(t) // <9 top month only

          if (!byTopic[t.slug]) byTopic[t.slug] = []

          if (t.slug in shoutsByTopic) shoutsByTopic[t.slug].push(s)
          topicset.add(t)
        }
      })

      if (s.layout) {
        // stores shouts by layouts
        if (!shoutsByLayout[s.layout]) shoutsByLayout[s.layout] = []

        if (!shoutsByLayout[s.layout].includes(s)) shoutsByLayout[s.layout].push(s)
      }
    }
  }

  createEffect(() => {

    if(data.topRecent?.length > 0) {
      topCommented = data.topRecent?.filter((s: Partial<Shout>) => s.stat && s.stat.comments > 0)
        .sort((a, b) => {
          if (a && b && a.stat && b.stat) return b.stat.comments - a.stat.comments

          return 0
        })
      if (topCommented?.length > 0) console.debug(topCommented)

      data.topRecent?.forEach(postLoad)
    }

    if(data.topMonth?.length > 0) {
      console.debug(data.topMonth)
      data.topMonth?.forEach(postLoad)
    }
    if(data.topOverall?.length > 0) data.topOverall?.forEach(postLoad)

    if(!randomTopics) {
      randomTopics = Object.entries(shoutsByTopic)
        .filter(([, v], _i) => (v as any[]).length > 4)
        .map((f) => f[0]) // 4 in the floor

      randomTopics = shuffle(randomTopics).slice(0,9)
      console.debug(`mainpage: ${randomTopics.toString()} topics selected`)
    }

    if (!randomLayout) {
      randomLayout = 'article' // shuffle(Object.keys(shoutsByLayout).filter((l) => l !== 'article'))[0]
      console.debug(`mainpage: ${randomLayout} layout selected`)
    }
  })

  return (
    <main class='home'>
      <PageLoadingBar active={data.loading} />
      <Show when={!data.loading && data.topMonth && data.topRecent && data.topOverall}>
        <NavTopics topics={randomTopics.slice(0, 9)} />
        <Row5 articles={data.topRecent.slice(5, 10)} />
        <Hero/>
        <Beside beside={data.topRecent[7]} top={true} title={'Самое читаемое'} values={topMonthTopics} wrapper={'article'}/>
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Beside top={true} beside={data.topRecent[8]} title={'Авторы месяца'} values={topMonthAuthors} wrapper={'author'} />
        <Slider title={'Лучшее за месяц'} articles={data.topRecent.slice(0, 8)}/>
        <Row2 articles={data.topRecent.slice(3, 5)} />
        <RowShort articles={data.topRecent.slice(3, 7)} />
        <Row1 article={data.topRecent[10]} />
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Row5 articles={topCommented} />
        <Slider title={'Избранное'} articles={data.topRecent.slice(0, 8)}/>
        <Beside top={true} beside={data.topRecent[8]} title={'Темы месяца'} values={topMonthTopics} wrapper={'topic'} />
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Group articles={data.topRecent.slice(0, 8)}/>
        <Banner/>
      </Show>
    </main>
  )
}

export default Home
