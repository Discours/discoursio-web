<script context="module" lang="ts">
  import 'swiper/css'
  import 'swiper/css/navigation'
  import type {Shout} from "$lib/codegen"

  export const prerender = true
  let size = 9,
    page = 0
  const sets = [
    'recents',
    'top-month',
    'top-overall',
    'top-viewed'
  ]
  export const load = ({ fetch, stuff }) => {
    console.log('root: preloading ' + sets.toString())
    size = stuff?.size ? stuff.size : size
    page = stuff?.page ? stuff.page : page
    let props: { update: { [key: string]: Shout[] } } = { update: {} } // exported down there
    sets.forEach(async (q) => {
      const r = await fetch(`feed/${q}.json?page=${page}&size=${size}`)
      if (r.ok) {
        const update = await r.json()
        if(update) {
          Object.assign(props.update, { ...update })
          const o = Object.values(update)[0] || {}
          console.debug(`${Object.values(o).length} ${q}`)
        }
      }
    })
    return { props }
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import SvelteSeo from 'svelte-seo'
  import { onMount } from 'svelte'
  import { shuffle } from '$lib/utils'

  import DiscoursAbout from '../components/DiscoursAbout.svelte'
  import DiscoursBanner from '../components/DiscoursBanner.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutBesideAuthors from '../components/ShoutBesideAuthors.svelte'
  import ShoutBesideFew from '../components/ShoutBesideFew.svelte'
  import ShoutBesideTopics from '../components/ShoutBesideTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  import ShoutFeed from '../components/ShoutFeed.svelte'
  import Shouts2 from '../components/Shouts2.svelte'
  import Shouts3 from '../components/Shouts3.svelte'
  import ShoutsFirst5 from '../components/ShoutsFirst5.svelte'
  import ShoutsGroup from '../components/ShoutsGroup.svelte'
  import ShoutsShort from '../components/ShoutsShort.svelte'
  import ShoutsSlider from '../components/ShoutsSlider.svelte'
  import ShoutWide from '../components/ShoutWide.svelte'
  import TopicHeader from '../components/TopicHeader.svelte'
  import { loading } from '../stores/app'
  import {
    authors,
    authorslist,
    recents,
    shouts,
    topics,
    topicslist,
    topMonth,
    topOverall,
    topViewed
  } from '../stores/zine'

  export let update
  let topCommented = []
  let topMonthAuthors = []
  let shoutsByTopic: { [key: string]: Array<Shout> } = {}
  let shoutsByLayout: { [key: string]: Array<Shout> } = {}
  let tslugs: Set<string> = new Set([])
  let aslugs: Set<string> = new Set([])

  const loadShout = (s) => {
    // stores with all the shouts
    $shouts[s.slug] = s
    // stores all the authors
    s.authors.forEach((a) => {
      aslugs.add(a.slug)
      if ($topMonth.includes(s) && !topMonthAuthors.includes(a)) topMonthAuthors.push(a) // <9 top month only
      if (!(a.slug in $authors)) {
        $authorslist.push(a)
        $authors[a.slug] = a
      }
    })
    // stores mentioned topics slugs
    s.topics.forEach(t => tslugs.add(t.slug))
    if (s.layout) {
      // stores shouts by layouts
      if (!shoutsByLayout[s.layout]) shoutsByLayout[s.layout] = []
      if (!shoutsByLayout[s.layout].includes(s)) shoutsByLayout[s.layout].push(s)
    }
  }

  $: if ($recents === null && update.recents) {
    console.debug('mainpage: preprocessing data...')
    // TODO: add $subscribedShouts store
    $recents = update.recents
    $recents.forEach(loadShout)
    $topOverall = update.topOverall
    $topOverall.forEach(loadShout)
    $topMonth = update.topMonth
    $topMonth.forEach(loadShout)
    $topViewed = update.topViewed
    $topViewed.forEach(loadShout)
    console.debug(`mainpage: found ${$authorslist.length.toString()} authors`)
    topCommented = $recents
      .filter((s) => s.stat.comments > 0)
      .sort((a, b) => b.stat.comments - a.stat.comments)
    const filledTopics = Object.entries(shoutsByTopic).filter(([k, v]) => v.length > 4) // 4 in the floor
    const rt = shuffle(filledTopics.map((f) => f[0])).slice(0, 2)
    randomLayout = shuffle(
      Object.keys(shoutsByLayout).filter((l) => l !== 'article')
    )[0]
    rtopic1 = rt[0]
    rtopic2 = rt[1]
    $loading = false
  }

  $: if ($topicslist === null && update.topicaAll) {
    $topicslist = update.topicsAll
    $topicslist.forEach((t) => ($topics[t.slug] = t))
    const datastring = JSON.stringify(update.topicsAll)
    if (window.localStorage['topics'] !== datastring) {
      window.localStorage['topics'] = datastring
      console.log(`mainpage: stored ${$topicslist.length} topics in localStorage`)
    }
  }

  onMount(() => {
    $recents = null
    console.debug('mainpage: mounted')
  })

  let rtopic1, rtopic2, randomLayout

  $: if ($recents?.length > 0 && aslugs?.size === 0) {
  }

  const meta = {
    title: 'Дискурс',
    description: 'Самоорганизующаяся журналистика',
    keywords: 'Discours.io, дискурс, самыздат, коллаборативная редакция, авторы'
  }
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>
<SvelteSeo
  {...meta}
  openGraph={{
    ...meta,
    images: [{ url: 'https://new.discours.io/logo.png' }]
  }}
/>
<main class="home" transition:fade>
  {#key $recents}
    {#if $topicslist?.length && $recents?.length}
      <NavTopics slugs={tslugs} />
      <ShoutsFirst5 shouts5={$recents.slice(0, 5)} />
      <DiscoursAbout />
      <ShoutBesideFew
        beside={$recents[5]}
        shouts={$topViewed}
        title={'Самое читаемое'}
        top={true}
      />
      <Shouts3 shouts={$recents.slice(6, 9)} />
      {#if topMonthAuthors}
        <ShoutBesideAuthors
          beside={$recents[9]}
          slugs={Array.from(aslugs)}
          title="Авторы месяца"
        />
        <ShoutsSlider shouts={$topMonth} title="Лучшее за месяц" />
        <Shouts2 shouts={$recents.slice(10, 12)} y={0} />
        <ShoutsShort shouts={$recents.slice(12, 16)} />
        <ShoutWide shout={$recents[16]} />
        <Shouts3 shouts={$recents.slice(17, 20)} />
        <ShoutsSlider shouts={$topOverall} title="Избранное" />
        <ShoutBesideTopics
          beside={$recents[20]}
          slugs={Array.from(tslugs)}
          title="Темы месяца"
        />
        <Shouts3 shouts={$recents.slice(21, 24)} />
        <ShoutsGroup shouts={shoutsByTopic[rtopic1]?.slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic1]} /></svelte:fragment>
          <svelte:fragment slot="aside"><ShoutCard shout={shoutsByTopic[rtopic1][0]} /></svelte:fragment>
        </ShoutsGroup>
        <Shouts2 shouts={$recents.slice(24, 26)} />
        <ShoutsGroup shouts={shoutsByTopic[rtopic2]?.slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic2]} /></svelte:fragment>
          <svelte:fragment slot="aside"><ShoutCard shout={shoutsByTopic[rtopic2][0]} /></svelte:fragment>
        </ShoutsGroup>
        <DiscoursBanner />
        <Shouts2 shouts={$recents.slice(26, 28)} />
        <div class="wide-container row">
          <TopicHeader topic={$topics[randomLayout]} color="black" />
        </div>
        <Shouts3 shouts={shoutsByLayout[randomLayout].slice(0, 3)} />
      {/if}
      <ShoutBesideFew
        shouts={$recents.slice(29, 35)}
        beside={$recents[28]}
        top={false}
        title={''}
      />
      <ShoutFeed shouts={$recents.slice(35, $recents.length)} />
    {/if}
  {/key}
</main>
