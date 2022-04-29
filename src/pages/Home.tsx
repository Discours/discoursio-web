import { Component, createEffect, Show } from 'solid-js'
import { useRouteData } from 'solid-app-router'
// import { useI18n } from '@solid-primitives/i18n';
import { useRouteReadyState } from '../utils/routeReadyState'
import bannerSrc from '../assets/discours-banner.jpg'
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

  const postLoad = (s: Partial<Shout>) => {
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

  const topCommented = () =>
    data.topRecent
      ?.filter((s: Partial<Shout>) => s.stat && s.stat.comments > 0)
      .sort((a, b) => {
        if (a && b && a.stat && b.stat) return b.stat.comments - a.stat.comments

        return 0
      })

  createEffect(() => {
    console.debug(data.topRecent)
    data.topRecent?.forEach(postLoad)
    data.topMonth?.forEach(postLoad)
    data.topOverall?.forEach(postLoad)

    randomTopics = Object.entries(shoutsByTopic)
      .filter(([, v], _i) => (v as any[]).length > 4)
      .map((f) => f[0]) // 4 in the floor
      .slice(0,9)

    // randomTopics = shuffle(goodTopics)

    // console.debug(`mainpage: ${randomTopics.toString()} topics selected`)

    // randomLayout = shuffle(Object.keys(shoutsByLayout).filter((l) => l !== 'article'))[0]
    console.debug(`mainpage: ${randomLayout} layout selected`)
    console.debug('home: updated')
  })

  return (
    <main class='home'>
      <Show when={!data.loading && data.topMonth && data.topRecent && data.topOverall}>
        <NavTopics topics={randomTopics.slice(0, 9)} />
        <img src={bannerSrc} />
        <Row5 articles={data.topRecent.slice(5, 10)} />
        <Hero/>
        <Beside beside={data.topRecent[7]} top={true} title={'Самое читаемое'} values={topMonthTopics} />
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Beside beside={data.topRecent[8]} title={'Авторы месяца'} values={topMonthAuthors} />
        <Slider title={'Лучшее за месяц'} articles={topMonthTopics}/>
        <Row2 articles={data.topRecent.slice(3, 5)} />
        <RowShort articles={data.topRecent.slice(3, 6)} />
        <Row1 article={data.topRecent[10]} />
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Row5 articles={topCommented()} />
        <Slider title={'Избранное'} articles={topMonthTopics}/>
        <Beside beside={data.topRecent[8]} title={'Темы месяца'} values={topMonthTopics} />
        <Row3 articles={data.topRecent.slice(0, 3)} />
        <Group articles={data.topRecent.slice(0, 8)}/>
      </Show>
    </main>
  )
}

export default Home
