<script context="module" lang="ts">
  import type { Shout } from '$lib/codegen'
  import { encodeGetParams } from '$lib/utils'
  import { onMount } from 'svelte'
  import { shuffle } from '$lib/utils'
  export const prerender = true

  const sets = [
    'reviewed',
    'subscribed',
    'candidates',
    'commented'
  ]

  export const load = async ({ fetch, stuff }) => {
    console.log('root: preloading ' + sets.toString())
    const params = Object.keys(stuff).length? '?' + encodeGetParams(stuff): ''
    let props: { update: { [key: string]: Shout[] } } = { update: {} } // exported down there
    let q = sets[0]
    let r = await fetch(`${q}.json${params}`)

    if (r.ok) {
      const update = await r.json()
      if(update) {
        Object.assign(props.update, { ...update })
        const o = Object.values(update)[0] || {}
        console.debug(`${Object.values(o).length} ${q}`)
      }
    }
    q = sets[1]
    r = await fetch(`${q}.json${params}`)
    if (r.ok) {
      const update = await r.json()
      if(update) {
        Object.assign(props.update, { ...update })
        const o = Object.values(update)[0] || {}
        console.debug(`${Object.values(o).length} ${q}`)
      }
    }
    q = sets[2]
    r = await fetch(`${q}.json${params}`)
    if (r.ok) {
      const update = await r.json()
      if(update) {
        Object.assign(props.update, { ...update })
        const o = Object.values(update)[0] || {}
        console.debug(`${Object.values(o).length} ${q}`)
      }
    }
    q = sets[3]
    r = await fetch(`${q}.json${params}`)
    if (r.ok) {
      const update = await r.json()
      if(update) {
        Object.assign(props.update, { ...update })
        const o = Object.values(update)[0] || {}
        console.debug(`${Object.values(o).length} ${q}`)
      }
    }
    return { props }
  }
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  import NavTopics from '../../components/NavTopics.svelte'
  import ShoutBesideAuthors from '../../components/ShoutBesideAuthors.svelte'
  import ShoutBesideTopics from '../../components/ShoutBesideTopics.svelte'
  import ShoutFeed from '../../components/ShoutFeed.svelte'
  import { more, pager } from '../../stores/app'
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

  let topicset = new Set([])

  const loaded = (update) => {
    $subscribedShouts = update?.subscribed
    $subscribedShouts.forEach(loadShout)
    $reviewedShouts = update?.reviewed
    $reviewedShouts.forEach(loadShout)
    $candidates = update?.candidates
    $candidates.forEach(loadShout)
    $topOverall = update?.topOverall
    $topOverall.forEach(loadShout)
    $commented = update?.commented
    $commented.forEach(loadShout)
    console.debug(`feed: loaded ${$authorslist.length.toString()} authors`)
  }

  // trigged by onMount
  $: if (stores[mode] === null && update.subscribedShouts) loaded(update)

  let size = 17
  let mode = 'subscribed' // all reviewed commented
  let dataset = []

  $: if (mode) {
    dataset = stores[mode]
    dataset.forEach(s => s.topics.forEach(t => topicset.add(t)))
    // FIXME: if (!dataset) mode = 'recents'
  }

  $: $pager[$more] = { 
    page: !dataset ? 0 : (dataset.length / size) - 1, 
    size: $pager[$more]?.size || size
  }

  onMount(() => (stores[mode] = null))
</script>

<section class="feed" transition:fade>
  {#key dataset}
    <NavTopics topics={shuffle(Array.from(topicset)).slice(0, 9)} />
    <ShoutBesideTopics beside={dataset[0]} slugs={$subscribedTopics} />
    <ShoutFeed name={mode} shouts={dataset.slice(2)} />
    <ShoutBesideAuthors beside={dataset[1]} slugs={$subscribedAuthors} />
  {/key}
</section>
