<script context="module" lang="ts">
  import type { Shout } from '$lib/codegen'
  import { encodeGetParams } from '$lib/utils'
  import { onMount } from 'svelte'
  export const prerender = true

  const queries = [
    'feed/reviewed',
    'feed/subscribed',
    'feed/candidates',
    'feed/commented'
  ]

  const fetchStuff = async (q, fetch, stuff) => {
    const r = await fetch(`${q}.json?${encodeGetParams(stuff)}`)
    if (r.ok) {
      const update = await r.json()
      console.debug(`${Object.values(update[0] || {}).length} ${q}`)
      return update
    }
    return {}
  }

  export const load = async ({ fetch, stuff }) => {
    // TODO: use stuff for url params
    console.log('preloader: feed/index')
    let props: { update: { [key: string]: Shout[] } } = { update: {} }
    await queries.forEach(async (q) => await fetchStuff(q, fetch, stuff))
    return { props }
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import NavTopics from '../../components/NavTopics.svelte'
  import ShoutBesideAuthors from '../../components/ShoutBesideAuthors.svelte'
  import ShoutBesideTopics from '../../components/ShoutBesideTopics.svelte'
  import ShoutFeed from '../../components/ShoutFeed.svelte'
  import { more } from '../../stores/app'
  import {
    reviewedShouts, // Shout[]
    subscribedShouts, // Shout[]
    subscribedAuthors, // string[]
    subscribedTopics, // string[]
    recents,
    commented,
    candidates,
    topOverall,
    topViewed,
    authorslist,
    authors,
    shouts
  } from '../../stores/zine'

  export let update // { subscribed reviewed recents top-overall top-viewed }

  const loadShout = (s) => {
    s.authors.forEach((a) => {
      if (!(a.slug in $authors)) {
        $authorslist.push(a)
        $authors[a.slug] = a
      }
    })
    $shouts[s.slug] = s
  }

  const stores = {
    subscribed: $subscribedShouts,
    reviewed: $reviewedShouts,
    recents: $recents,
    commented: $commented,
    'top-overall': $topOverall,
    'top-viewed': $topViewed
  }

  const loaded = (update) => {
    $subscribedShouts = update.subscribed
    $subscribedShouts.forEach(loadShout)
    $reviewedShouts = update.reviewed
    $reviewedShouts.forEach(loadShout)
    $candidates = update.candidates
    $candidates.forEach(loadShout)
    $topOverall = update.topOverall
    $topOverall.forEach(loadShout)
    $commented = update.commented
    $commented.forEach(loadShout)
    console.debug(`feed: loaded ${$authorslist.length.toString()} authors`)
  }

  // trigged by onMount
  $: if (stores[mode] === null && update.subscribedShouts) loaded(update)

  let size = 17
  let mode = 'subscribed' // all topOverall topCommented
  let dataset = []

  $: if (mode) {
    dataset = stores[mode]
    if (!dataset) mode = 'recents'
  }

  $: page = !dataset ? 0 : (dataset.length / size) - 1

  $: if ($more)
    fetchStuff('feed/' + $more, fetch, { page, size })
      .then(({ update }) => loaded(update))
      .catch(console.error)

  onMount(() => (stores[mode] = null))
</script>

<section class="feed" transition:fade>
  {#key dataset}
    <NavTopics shouts={dataset} />
    <ShoutBesideTopics beside={dataset[0]} slugs={$subscribedTopics} />
    <ShoutFeed name={mode} shouts={dataset.slice(2)} />
    <ShoutBesideAuthors beside={dataset[1]} slugs={$subscribedAuthors} />
  {/key}
</section>
