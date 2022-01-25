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
  import ShoutsTopic from '../components/ShoutsTopic.svelte'
  import ShoutsFirst5 from '../components/ShoutsFirst5.svelte'
  import ShoutBesideFew from '../components/ShoutBesideFew.svelte'
  import ShoutBesideTopics from '../components/ShoutBesideTopics.svelte'
  import ShoutBesideAuthors from '../components/ShoutBesideAuthors.svelte'

  let topCommented = [],
    topMonthAuthors = [],
    topicsMonth = [],
    shoutsByTopic = {},
    shoutsByLayout = {}
  let tslugs: Set<string> = new Set([])
  let aslugs: Set<string> = new Set([])

  // one topic filtered
  const oneTopic = (filter) =>
    $recents.filter((t) => t.topics.find((topic) => topic.slug === filter))

  //const byDate = (a, b) =>
  //  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()

  $: if ($topicslist && $topicslist.length > 0 && $recents === null) {
    console.debug('mainpage: processing publications lists')
    $loading = true
    // $recents = Object.values($shouts).sort(byDate)
    $topOverall.forEach((s) => ($shouts[s.slug] = s))
    $topMonth.forEach((s) => {
      $shouts[s.slug] = s
      s.authors.forEach((a) => {
        if (!aslugs.has(a.slug)) {
          aslugs.add(a.slug)
          topMonthAuthors.push(a)
        }
      })
      s.topics.forEach((t) => {
        if (!tslugs.has(t.slug)) {
          tslugs.add(t.slug)
          topicsMonth.push($topics[t.slug])
        }
      })
    })
    console.log(
      `mainpage: loaded ${Object.keys($shouts).length} shouts from api`
    )
    $recents.forEach((s) => {
      s.topics.forEach((t) => tslugs.add(t.slug))
      if (s.layout) {
        if (!shoutsByLayout[s.layout]) shoutsByLayout[s.layout] = new Set([])
        shoutsByLayout[s.layout].add(s)
      }
    })
    console.log(`mainpage: ${Object.keys(shoutsByLayout)}`)
    tslugs.forEach((t) => (shoutsByTopic[t] = oneTopic(t)))
    console.log(`mainpage: ${tslugs.size} topics found`)

    // top commented
    topCommented = $recents
      .filter((s) => s.stat.comments > 0)
      .sort((a, b) => b.stat.comments - a.stat.comments)
    console.log(`mainpage: found ${topCommented.length.toString()} commented`)

    // top month topics sorted by authors amount
    const byAuthors = (a, b) => b.topicStat.authors - a.topicStat.authors
    topicsMonth = topicsMonth.sort(byAuthors)

    // top month authors
    const byRating = (a, b) => b.rating - a.rating
    topMonthAuthors = topMonthAuthors.sort(byRating)
    console.log(
      `mainpage: found ${topMonthAuthors.length.toString()} top month authors`
    )
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
<main>
  <div class="home" transition:fade>
    {#if $recents?.length > 0}
      {@debug $recents}
      <NavTopics shouts={$recents} />
      <ShoutsFirst5 shouts5={$recents.slice(0, 5)} />
      <DiscoursAbout />
      <ShoutBesideFew shouts={$topViewed} title={'Самое читаемое'} />
      <Shouts3 shouts={$recents.slice(5, 8)} />
        <ShoutBesideAuthors
          beside={$recents[8]}
          slugs={Array.from(aslugs)}
          title="Авторы месяца"
        />
        <ShoutsSlider shouts={$topMonth} title="Лучшее за месяц" />
        <Shouts2 shouts={$recents.slice(9, 11)} />
        <ShoutsShort shouts={$recents.slice(11, 15)} />
        <ShoutWide shout={$recents[15]} />
        <Shouts3 shouts={$recents.slice(16, 19)} />
        <ShoutsSlider shouts={$topOverall} title="Избранное" />
        <ShoutBesideTopics
          beside={$recents[19]}
          slugs={Array.from(tslugs)}
          title="Темы месяца"
        />
        <Shouts3 shouts={$recents.slice(20, 23)} />
      {#if false}
        <ShoutsTopic
          topic={$topics['research']}
          shouts={shoutsByTopic['research']}
        />
        <Shouts2 shouts={$recents.slice(23, 25)} />
        <ShoutsTopic
          topic={$topics['psychology']}
          shouts={shoutsByTopic['psychology']}
        />
        <DiscoursBanner />
        <Shouts3 shouts={$recents.slice(25, 28)} />
        <ShoutsTopic topic={$topics['music']} shouts={shoutsByTopic['music']} />
        <ShoutBesideFew shouts={$recents.slice(28, 34)} />
        <ShoutFeed shouts={$recents.slice(34, $recents.length)} />
      {/if}
    {/if}
  </div>
</main>
