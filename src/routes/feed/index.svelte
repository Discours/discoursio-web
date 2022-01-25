<script context="module">
  export const prerender = true
</script>

<script lang="ts">
  import NavTopics from '../../components/NavTopics.svelte'
  import {
    subscribedAuthors, // string[]
    subscribedTopics, // string[]
    authors, // { slug: User }
    authorslist, // User[]
    shouts, // { slug: Shout }
    recents // Shout[]
  } from '../../stores/zine'
  import { fade } from 'svelte/transition'
  import ShoutFeed from '../../components/ShoutFeed.svelte'

  let topCommented

  $: if ($subscribedAuthors && $subscribedAuthors.length > 0) {
    ;(async () => {
      const aq = await fetch(
        `/feed/by-authors.json?authors=${await JSON.stringify(
          $subscribedAuthors
        )}`
      )
      if (aq.ok) {
        const data = await aq.json()
        data?.shouts?.forEach((s) => ($shouts[s.slug] = s))
        if (data.shouts) $recents = [...data.shouts, ...$recents]
        data?.authors?.forEach((a) => ($authors[a.slug] = a))
        if (data.authors) $authorslist = [...data.authors, ...$authorslist]
        console.log(data)
      }
    })()
  }

  $: if ($subscribedTopics && $subscribedTopics.length > 0) {
    // NOTE: $topicslist should be preloaded by layout
    ;(async () => {
      const tq = await fetch(
        `/feed/by-topics.json?topics=${await JSON.stringify($subscribedTopics)}`
      )
      if (tq.ok) {
        const data = await tq.json()
        data?.shouts?.forEach((s) => ($shouts[s.slug] = s))
        if (data.shouts) $recents = [...data.shouts, ...$recents]
        data?.authors?.forEach((a) => ($authors[a.slug] = a))
        if (data.authors) $authorslist = [...data.authors, ...$authorslist]
        console.log(data)
      }
    })()
  }
</script>

<section class="feed" transition:fade>
  {#if $recents}
    <NavTopics shouts={$recents} />
    <ShoutFeed name={'recents'} on:loadmore={() => more()} />
    <ShoutFeed name={'by-topics'} />
    <ShoutFeed name={'by-authors'} />
  {/if}
</section>
