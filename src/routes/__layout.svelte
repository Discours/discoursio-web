<script context="module">
  // import dayjs from 'dayjs/esm'
  // import relativeTime from 'dayjs/esm/plugin/relativeTime'
  // dayjs().format()
  export const prerender = true
</script>

<script lang="ts">
  // import { getSubscriptions } from '$lib/cookie'
  import DiscoursFooter from '../components/DiscoursFooter.svelte'
  import NavHeader from '../components/NavHeader.svelte'
  import '../app.scss'
  import { onMount } from 'svelte'
  import { topicslist } from '../stores/zine'
  import { snake2camel } from '$lib/utils'
  import { 
    recents, topMonth, topOverall, 
    topViewed, commented, subscribedAuthors, 
    subscribedShouts, subscribedTopics, reviewedShouts 
  } from '../stores/zine'
  import { loading, more, pager } from '../stores/app'
  import { getSubscriptions } from '$lib/cookie'
  import { session } from '$app/stores'

  // loads if localStorage is empty
  $: if($topicslist === null) {
    console.debug('topics are null')
    fetch(`/topic/all.json`)
      .then((r) => r.ok && r.json())
      .then((ttt) => {
        if ($topicslist != ttt.topicsAll) {
          $topicslist = ttt.topicsAll
          console.log(
            `root: ${$topicslist.length} topics updated with browser request`
          )
        }
      })
      .catch(console.error)
    }

  const stores = {
    'recents': $recents,
    'top-overall': $topOverall,
    'top-month': $topMonth,
    'top-viewed': $topViewed,
    'commented': $commented,
    'subscribed': $subscribedShouts,
    'reviewed': $reviewedShouts
  }

  // loads more data if $more is not empty
  const loadMore = async (stuff) => {
    console.log('root: loading more...')
    const size = stuff?.size ? stuff.size : $pager[$more].size
    const page = stuff?.page ? stuff.page : $pager[$more].page
    const r = await fetch(`feed/${$more}.json?page=${page}&size=${size}`)
    if (r.ok) {
      const key = snake2camel($more)
      const update = await r.json()
      const data = update[key] || []
      console.debug(`root: loaded more ${data?.length} ${$more}`)
      stores[key].set(data)
    }
    $more = ''
  }
  
  $: if ($more) {
    $loading = true
    const stuff = { ...$pager[$more], name: $more }
    loadMore(stuff).then(() => ($loading = false))
  }

  onMount(async () => {
    $subscribedTopics = await getSubscriptions('topics')
    $subscribedAuthors = await getSubscriptions('authors')
    if(!$topicslist?.length) {
      const ttt = JSON.parse(window.localStorage.getItem('topics') || '[]')
      if(ttt?.length) {
        $topicslist = ttt
        console.log(`root: found ${ttt.length} topics in localStorage`)
      } else $topicslist = null // force update, WARN: works only with null!
    }
  })
</script>

<svelte:head>
  <link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<NavHeader />
<main><slot /></main>
<DiscoursFooter />
