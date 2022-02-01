<script context="module">
  import 'swiper/css'
  import 'swiper/css/navigation'
  export const prerender = true
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import SvelteSeo from 'svelte-seo'
  
  import type { Shout } from '$lib/codegen'
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
    recents,
    shouts,
    topics,
    topMonth,
    topOverall,
    topViewed
  } from '../stores/zine'

  let topCommented = [],
    topMonthAuthors = [],
    // topicsMonth = [],
    shoutsByTopic: {[key: string]: Array<Shout>} = {},
    shoutsByLayout: {[key: string]: Array<Shout>} = {}
  let tslugs: Set<string> = new Set([])
  let aslugs: Set<string> = new Set([])

  // one topic filtered
  const filterFilledTopic = (filter) =>
    $recents.filter((t) => t.topics.find((topic) => topic.slug === filter))

  let rtopic1, rtopic2 , randomLayout
  $: if ($topMonth?.length > 0 && !topMonthAuthors?.length) {
    console.debug('mainpage: processing publications lists')
    $loading = true
    $topOverall.forEach((s) => ($shouts[s.slug] = s))
    $topMonth.forEach((s) => {
      $shouts[s.slug] = s
      s.authors.forEach((a) => {
        if (!aslugs.has(a.slug)) {
          aslugs.add(a.slug)
          topMonthAuthors.push(a)
        }
      })
      s.topics.forEach((t) => tslugs.add(t.slug))
    })
    $recents.forEach((s) => {
      s.topics.forEach((t) => tslugs.add(t.slug))
      if (s.layout) {
        if (!shoutsByLayout[s.layout]) shoutsByLayout[s.layout] = []
        shoutsByLayout[s.layout].push(s)
      }
    })
    // console.log(`mainpage: }`)
    tslugs.forEach((t) => (shoutsByTopic[t] = filterFilledTopic(t)))
    topCommented = $recents
      .filter((s) => s.stat.comments > 0)
      .sort((a, b) => b.stat.comments - a.stat.comments)
    // const byAuthors = (a, b) => b.topicStat.authors - a.topicStat.authors
    // topicsMonth = topicsMonth.sort(byAuthors)
    const byRating = (a, b) => b.rating - a.rating
    topMonthAuthors = topMonthAuthors.sort(byRating)
    const filledTopics = Object.entries(shoutsByTopic).filter(([k,v]) => v.length > 4) // 4 in the floor
    const rt = shuffle(filledTopics.map(f => f[0])).slice(0,2)
    randomLayout = shuffle(Object.keys(shoutsByLayout).filter(l => l !== 'article'))[0]
    rtopic1 = rt[0]
    rtopic2 = rt[1]
    $loading = false
  }

  // NOTICE: onMount(() => $recents = null) should be triggered by __layout.svelte

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
    {#if $recents?.length > 0}
      <NavTopics shouts={$recents} />
      <ShoutsFirst5 shouts5={$recents.slice(0, 5)} />
      <DiscoursAbout />
      <ShoutBesideFew beside={$recents[5]} shouts={$topViewed} title={'Самое читаемое'} top={true} />
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
        <ShoutsSlider shouts={$topOverall} title="Избранное"/>
        <ShoutBesideTopics
          beside={$recents[20]}
          slugs={Array.from(tslugs)}
          title="Темы месяца"
        />
        <Shouts3 shouts={$recents.slice(21, 24)} />
        <ShoutsGroup shouts={shoutsByTopic[rtopic1].slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic1]} /></svelte:fragment>
          <svelte:fragment slot="aside"><ShoutCard shout={shoutsByTopic[rtopic1][0]} /></svelte:fragment >
        </ShoutsGroup>
        <Shouts2 shouts={$recents.slice(24, 26)} />
        <ShoutsGroup shouts={shoutsByTopic[rtopic2].slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic2]} /></svelte:fragment>
          <svelte:fragment slot="aside"><ShoutCard shout={shoutsByTopic[rtopic2][0]} /></svelte:fragment >
        </ShoutsGroup>
        <DiscoursBanner />
        <Shouts2 shouts={$recents.slice(26, 28)} />
        <div class="wide-container row"><TopicHeader topic={$topics[randomLayout]} color="black" /></div>
        <Shouts3 shouts={shoutsByLayout[randomLayout].slice(0, 3)} />
      {/if}
      <ShoutBesideFew shouts={$recents.slice(29, 35)} beside={$recents[28]} top={false} title={''}/>
      <ShoutFeed shouts={$recents.slice(35, $recents.length)} />
    {/if}
</main>

<style>
  .shout-card__type {
    top: unset;
    right: 0; width: 2.2rem;
  }
</style>