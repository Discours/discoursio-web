<script context="module">
  import 'swiper/css'
  import 'swiper/css/navigation'
  export const prerender = true
</script>

<script lang="ts">
  import {
    shouts,
    topics,
    recents,
    topicslist,
    topOverall,
    topMonth,
    topViewed
  } from '../stores/zine'
  import DiscoursBanner from '../components/DiscoursBanner.svelte'
  import NavTopics from '../components/NavTopics.svelte'
  import { fade } from 'svelte/transition'
  import { loading } from '../stores/app'
  import ShoutFeed from '../components/ShoutFeed.svelte'
  import SvelteSeo from 'svelte-seo'
  import DiscoursAbout from '../components/DiscoursAbout.svelte'
  import Shouts3 from '../components/Shouts3.svelte'
  import Shouts2 from '../components/Shouts2.svelte'
  import ShoutWide from '../components/ShoutWide.svelte'
  import ShoutsShort from '../components/ShoutsShort.svelte'
  import ShoutsSlider from '../components/ShoutsSlider.svelte'
  import ShoutsGroup from '../components/ShoutsGroup.svelte'
  import ShoutsFirst5 from '../components/ShoutsFirst5.svelte'
  import ShoutBesideTop from '../components/ShoutBesideTop.svelte'
  import ShoutBesideTopics from '../components/ShoutBesideTopics.svelte'
  import ShoutBesideAuthors from '../components/ShoutBesideAuthors.svelte'
  import TopicHeader from '../components/TopicHeader.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
import { kMaxLength } from 'buffer';
import { shuffle } from '$lib/utils';

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

  let rtopic1, rtopic2, filledTopics
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
    // console.log(`mainpage: ${Object.keys(shoutsByLayout)}`)
    tslugs.forEach((t) => (shoutsByTopic[t] = filterFilledTopic(t)))
    topCommented = $recents
      .filter((s) => s.stat.comments > 0)
      .sort((a, b) => b.stat.comments - a.stat.comments)
    // const byAuthors = (a, b) => b.topicStat.authors - a.topicStat.authors
    // topicsMonth = topicsMonth.sort(byAuthors)
    const byRating = (a, b) => b.rating - a.rating
    topMonthAuthors = topMonthAuthors.sort(byRating)
    filledTopics = Object.entries(shoutsByTopic).filter(([k,v]) => v.length > 6)
    console.dir(filledTopics)
    const rt = shuffle(filledTopics.map(f => f[0])).slice(0,2)
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
      <ShoutBesideTop beside={$recents[5]} shouts={$topViewed} title={'Самое читаемое'} />
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
        <ShoutsGroup shouts={shoutsByTopic[rtopic1].slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic1]} /></svelte:fragment>
          <svelte:fragment  slot="aside"><ShoutCard shout={shoutsByTopic[rtopic1][0]} /></svelte:fragment >
        </ShoutsGroup>
        <Shouts2 shouts={$recents.slice(24, 26)} />
        <ShoutsGroup shouts={shoutsByTopic[rtopic2].slice(1)}>
          <svelte:fragment slot="header"><TopicHeader topic={$topics[rtopic2]} /></svelte:fragment>
          <svelte:fragment  slot="aside"><ShoutCard shout={shoutsByTopic[rtopic2][0]} /></svelte:fragment >
        </ShoutsGroup>
        <DiscoursBanner />
        <Shouts3 shouts={$recents.slice(26, 29)} />
        <ShoutsGroup shouts={shoutsByLayout['music'].slice(1)}>
            <svelte:fragment  slot="aside"><ShoutCard shout={shoutsByLayout['music'][0]} /></svelte:fragment >
        </ShoutsGroup>
      {/if}
      <ShoutBesideTop shouts={$recents.slice(30, 36)} beside={$recents[29]} />
      <ShoutFeed shouts={$recents.slice(36, $recents.length)} />
    {/if}
</main>
