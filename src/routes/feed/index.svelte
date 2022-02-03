<script context="module" lang="ts">
  import type { Shout } from '$lib/codegen'
  import { encodeGetParams } from '$lib/utils'
  import { session as sessionSvelte } from '$app/stores'
  import { session } from '../../stores/user'
  export const prerender = true

  const queries = ['feed/by-authors', 'feed/by-topics', 'feed/by-comments']

  const fetchStuff = async (q, fetch, stuff) => {
    const r = await fetch(`${q}.json?${encodeGetParams(stuff)}`)
    if(r.ok) {
      const update = await r.json()
      console.debug(`${Object.values(update[0] || {}).length} ${q}`)
      return update
    }
    return {}
  }

  export const load = async ({ fetch, stuff }) => { // TODO: use stuff for url params
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
    recents, // Shout[]
    subscribedAuthors, // string[]
    subscribedTopics // string[]
  } from '../../stores/zine'

  let authorsPage = 0
  let topicsPage = 0
  let reviewedPage = 0
  const onPage = 25

  const renew = async (params) => {
    const {update: { shouts, topics, authors }} = await fetchStuff('feed/'+$more, fetch, params)
    
  }

  $: if ($more === 'by-authors') {
    authorsPage += 1
    renew({page: authorsPage, size: onPage, slugs: JSON.stringify($subscribedAuthors)})
    $more = ''
  }

  $: if ($more === 'by-topics') {
    topicsPage += 1
    renew({page: topicsPage, size: onPage, slugs: JSON.stringify($subscribedTopics)})
    $more = ''
  }

  $: if ($more === 'by-reviewer') {
    reviewedPage += 1
    renew({page: reviewedPage, size: onPage, author: $session.slug })
    $more = ''
  }

  $: filteredShouts = []
</script>

<section class="feed" transition:fade>
  {#key filteredShouts}
    <NavTopics shouts={filteredShouts} />
    <ShoutBesideTopics beside={filteredShouts[0]} slugs={$subscribedTopics} />
    <ShoutFeed name={'recents'} shouts={filteredShouts.slice(2)} />
    <ShoutBesideAuthors beside={filteredShouts[1]} slugs={$subscribedAuthors} />
  {/key}
</section>
