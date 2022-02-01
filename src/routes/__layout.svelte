<script context="module" lang="ts">
  // import dayjs from 'dayjs/esm'
  // import relativeTime from 'dayjs/esm/plugin/relativeTime'
  // dayjs().format()
  import type { Shout } from '$lib/codegen'
  export const prerender = true
  let size = 9,
    page = 0

  export const load = async ({ fetch, stuff }) => {
    console.log('on-server preloading...')
    size = stuff?.size ? stuff.size : size
    page = stuff?.page ? stuff.page : page
    let props: { update: { [key: string]: Shout[] } } = { update: {} }
    const recents = await fetch(`/feed/recents.json?page=${page}&size=${size}`)
    const topMonth = await fetch(
      `/feed/top-month.json?page=${page}&size=${size}`
    )
    const topOverall = await fetch(
      `/feed/top-overall.json?page=${page}&size=${size}`
    )
    const topViewed = await fetch(
      `/feed/top-viewed.json?page=${page}&size=${size}`
    )
    const topicsAll = await fetch(`/topic/all.json`)
    props.update = recents.ok
      ? { ...(await recents.json()), ...props.update }
      : props.update
    props.update = topMonth.ok
      ? { ...(await topMonth.json()), ...props.update }
      : props.update
    props.update = topOverall.ok
      ? { ...(await topOverall.json()), ...props.update }
      : props.update
    props.update = topViewed.ok
      ? { ...(await topViewed.json()), ...props.update }
      : props.update
    props.update = topicsAll.ok
      ? { ...(await topicsAll.json()), ...props.update }
      : props.update
    Object.entries(props.update).forEach(([k, v]) =>
      console.debug(`${v.length} ${k}`)
    )
    return { props }
  }
</script>

<script lang="ts">
  import '../app.scss'
  
  import { onMount } from 'svelte'
  
  import { navigating } from '$app/stores'
  import { getSubscriptions } from '$lib/cookie'
  
  import DiscoursFooter from '../components/DiscoursFooter.svelte'
  import NavHeader from '../components/NavHeader.svelte'
  import { loading, more, pager } from '../stores/app'
  import {
    authors,
    authorslist,
    recents as recentsStore,
    shouts,
    subscribedAuthors,
    subscribedShouts,
    subscribedTopics,
    topics,
    topicslist,
    topMonth as topMonthStore,
    topOverall as topStore,
    topViewed as topViewedStore} from '../stores/zine'

  export let update

  $: $loading = !!$navigating

  const loadShout = (s) => {
    s.authors.forEach((a) => {
      if (!(a.slug in $authors)) {
        $authorslist.push(a)
        $authors[a.slug] = a
      }
    })
    $shouts[s.slug] = s
  }
  
  // const byDate = (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()

  // trigged by layout.onMount
  $: if ($recentsStore === null && update.recents) {
    // TODO: add $subscribedShouts store
    $recentsStore = update.recents
    $recentsStore.forEach(loadShout)
    $topStore = update.topOverall
    $topStore.forEach(loadShout)
    $topMonthStore = update.topMonth
    $topMonthStore.forEach(loadShout)
    $topViewedStore = update.topViewed
    $topViewedStore.forEach(loadShout)
    console.debug(`preload: found ${$authorslist.length.toString()} authors`)
  }

  $: if ($more) {
    $loading = true
    const stuff = {...$pager[$more.toString()], name: $more }
    load({ fetch, stuff }).then(() => ($loading = false))
  }

  $: if ($topicslist === null) {
    if (!update.topicsAll) {
      $topicslist = JSON.parse(window.localStorage.getItem('topics') || '[]')
      console.log(`preload: ${$topicslist.length} topics from localStorage`)
      if(!$topicslist) fetch(`/topic/all.json`)
        .then((r) => r.ok && r.json())
        .then((ttt) => {
          if ($topicslist != ttt.topicsAll) {
            $topicslist = ttt.topicsAll
            console.log(
              `preload: ${$topicslist.length} topics with browser request`
            )
          }
        })
    } else {
      $topicslist = update.topicsAll
      $topicslist.forEach((t) => ($topics[t.slug] = t))
    }
    const datastring = JSON.stringify(update.topicsAll)
    if (window.localStorage['topics'] !== datastring) {
      window.localStorage['topics'] = datastring
      console.log(
        `preload: updated ${$topicslist.length} topics in localStorage`
      )
    }
  }

  $: if (!$loading && $topicslist.length && $recentsStore.length)
    $loading = false

  onMount(async () => {
    $loading = true
    $subscribedTopics = await getSubscriptions('topics')
    $subscribedAuthors = await getSubscriptions('authors')
    $subscribedShouts = await getSubscriptions('shouts')
    $recentsStore = null
    $topicslist = null // force update, WARN: works only with null!
    console.debug('layout: mounted, preloading...')
  })
</script>

<svelte:head>
  <link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<NavHeader />
<main><slot /></main>
<DiscoursFooter />
