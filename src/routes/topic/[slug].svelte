<script context="module" lang="ts">
  export const prerender = true

  export const load = async ({ params, fetch }) => {
    const { slug } = params
    let props = { slug }
    const q = await fetch(`/topic/${slug}.json`)
    if (q.ok) {
      const data = await q.json()
      props = { ...data, ...props }
    }
    return { props }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  import { browser } from '$app/env'
  import { page } from '$app/stores'
  import type { Shout, Topic, User } from '$lib/codegen'

  import ShoutBesideAuthors from '../../components/ShoutBesideAuthors.svelte'
  import ShoutCard from '../../components/ShoutCard.svelte'
  import ShoutFeed from '../../components/ShoutFeed.svelte'
  import Shouts2 from '../../components/Shouts2.svelte'
  import Shouts3 from '../../components/Shouts3.svelte'
  import ShoutWide from '../../components/ShoutWide.svelte'
  import TopicFull from '../../components/TopicFull.svelte'
  import UserCard from '../../components/UserCard.svelte'
  import { topics, topicslist } from '../../stores/zine'

  export let shouts: Shout[]
  export let authors: User[]
  export let slug: string
  let topShoutsAbout = [] // TODO: get topShoutsAbout with api
  let topViewedAbout = [] // TODO: get topViewedAbout from api
  let topic: Topic
  let mode: string
  let byTopic = {}

  $: if (shouts?.length > 0 && Object.keys(byTopic).length === 0) {
    shouts.forEach((s) => {
      let st = byTopic[s.mainTopic]
      if (!st) st = []
      st.push(s)
      byTopic[s.mainTopic] = st
    })
  }

  $: if ($topicslist) topic = $topics[slug]

  onMount(() => {
    if (browser) slug = $page.params.slug
    console.log('topic: [' + slug + ']')
    topic = $topics[slug]
    mode = window.location.hash
  })

  const sortBy = (by) => {
    switch (by) {
      case 'popular':
        shouts = shouts.sort((a, b) => b.stat.views - a.stat.views)
        break
      case 'fresh':
        shouts = shouts.sort(
          (a, b) =>
            new Date(b.publishedAt).getMilliseconds() -
            new Date(a.publishedAt).getMilliseconds()
        )
        break
      case 'discuss':
        shouts = shouts.sort((a, b) => b.stat.comments - a.stat.comments)
        break
      default:
        mode = 'fresh'
    }
    mode = by
  }
</script>

<svelte:head><title>Дискурс : {$page.params.slug}</title></svelte:head>
<TopicFull {topic} />

<div class="container" transition:fade>
  {#if shouts?.length < 8}
    <div class="col-md-4">
      <h3>Тему поддерживают</h3>
      {#each Object.values(authors).slice(0, 5) as user}
        <UserCard {user} />
      {/each}
    </div>
  {:else}
    <div class="row topic__controls">
      <div class="col-md-8">
        <ul class="view-switcher">
          <li class:selected={mode === 'fresh'}>
            <button type="button" on:click={() => sortBy('fresh')}
              >Свежее</button
            >
          </li>
          <li class:selected={mode === 'popular'}>
            <button type="button" on:click={() => sortBy('popular')}
              >Популярное</button
            >
          </li>
          <li class:selected={mode === 'discuss'}>
            <button type="button" on:click={() => sortBy('discuss')}
              >Обсуждаемое</button
            >
          </li>
        </ul>
      </div>

      <div class="col-md-4">
        <div class="mode-switcher">
          Показывать
          <span class="mode-switcher__control">Все публикации</span>
        </div>
      </div>
    </div>

    <div class="row">
      <ShoutWide shout={shouts[0]} />
      <Shouts3 shouts={shouts.slice(1, 4)} />
      <Shouts2 shouts={shouts.slice(4, 6)} />
      <ShoutBesideAuthors
        title="Тему поддерживают"
        slugs={Object.values(authors)
          .map((a) => a.slug)
          .slice(0, 5)}
        beside={shouts[6]}
      />

      <div class="floor floor--important">
        <div class="container">
          <div class="row">
            <h3 class="col-12">Популярное</h3>
            {#each topViewedAbout as shout}
              <div class="col-md-6">
                <ShoutCard {shout} />
              </div>
            {/each}
          </div>
        </div>
      </div>

      <Shouts3 shouts={shouts.slice(10, 13)} />
      <Shouts3 shouts={shouts.slice(13, 16)} />

      <div class="floor floor--important">
        <div class="container">
          <div class="row">
            <h3 class="col-12">Избранное</h3>
            {#each topShoutsAbout as shout}
              <div class="col-md-4">
                <ShoutCard {shout} />
              </div>
            {/each}
          </div>
        </div>
      </div>

      <Shouts2 shouts={shouts.slice(0, 2)} />
      <Shouts3 shouts={shouts.slice(2, 5)} />
      <Shouts2 shouts={shouts.slice(5, 7)} />
    </div>
  {/if}
</div>

<style lang="scss">
  .topic__controls {
    align-items: baseline;
    margin-bottom: 7rem;
    margin-top: 7rem;
  }

  .view-switcher {
    margin-bottom: 0;
  }

  .mode-switcher {
    @include font-size(1.5rem);
    text-align: right;
  }

  .mode-switcher__control {
    border-bottom: 1px dotted;
    cursor: pointer;
    font-weight: bold;
  }
</style>
