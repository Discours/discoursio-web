<script context="module">
  export const prerender = true
</script>

<script lang="ts">
  import { fade } from 'svelte/transition'
  
  import type { User } from '$lib/codegen'
  
  import NavTopics from '../../components/NavTopics.svelte'
  import ShoutBesideAuthors from '../../components/ShoutBesideAuthors.svelte'
  import ShoutBesideTopics from '../../components/ShoutBesideTopics.svelte'
  import ShoutFeed from '../../components/ShoutFeed.svelte'
  import { more } from '../../stores/app'
  import {
    authors, // { slug: User }
    authorslist, // User[]
    recents, // Shout[]
    shouts, // { slug: Shout }
    subscribedAuthors, // string[]
    subscribedTopics// string[]
  } from '../../stores/zine'

  let authorsPage = 0
  let topicsPage = 0
  /**
   * все публикации попадают в один сортированный по дате стор рисентс
   * @param q - результат запроса
   */
  const extract = async (q) => {
    const data = await q.json()
    data?.shouts?.forEach((s) => ($shouts[s.slug] = s))
    data?.authors?.forEach((a: Partial<User>) => ($authors[a.slug] = a))
    // NOTE: all topics are preloaded
    if (data?.authors)
      $authorslist = Array.from(new Set([...data.authors, ...$authorslist]))
    if (data?.shouts)
      $recents = Array.from(new Set([...data.shouts, ...$recents]))
  }

  const renew = async () => {
    const aq = await fetch(
      `/feed/by-authors.json?authors=
        ${await JSON.stringify($subscribedAuthors)}
        &page=${authorsPage}
        &size=25`
    )
    const tq = await fetch(
      `/feed/by-topics.json?topics=
        ${await JSON.stringify($subscribedTopics)}
        &page=${topicsPage}
        &size=25`
    )
    if (tq.ok) await extract(tq)
    if (aq.ok) await extract(aq)
  }

  $: if ($more === 'by-authors') {
    $more = ''
    authorsPage += 1
    renew()
  }
  $: if ($more === 'by-topics') {
    $more = ''
    topicsPage += 1
    renew()
  }
</script>

<section class="feed" transition:fade>
  {#if $recents}
    <NavTopics shouts={$recents} />
    <ShoutBesideTopics beside={$recents[0]} slugs={$subscribedTopics} />
    <ShoutFeed name={'recents'} shouts={$recents.slice(2)} />
    <ShoutBesideAuthors beside={$recents[1]} slugs={$subscribedAuthors} />
  {/if}
</section>
