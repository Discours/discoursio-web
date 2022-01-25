<script lang="ts">
  import type { Shout } from '$lib/codegen'
  import { shuffle } from '$lib/utils'
  import { onMount } from 'svelte'
  import {
    filterTopic,
    subscribedTopics,
    topics,
    topicslist
  } from '../stores/zine'

  export let shouts: Shout[]
  let slugs: Set<string> = new Set([])
  let navTopics: string[] = []
  let mounted = false
  const topicsAmount = 9
  const getTitle = (slug: string) =>
    slug && $topics[slug] ? $topics[slug].title : slug || 'ошибка'
  $: if (mounted && slugs.size === 0 && $topicslist) {
    shouts.forEach((s) => s.topics.forEach((t) => slugs.add(t.slug)))
    $subscribedTopics.forEach((t) => slugs.add(t))
    navTopics = shuffle(Array.from(slugs)).slice(0, topicsAmount)
    console.log(
      `navtopics: ${topicsAmount.toString()}/${slugs.size.toString()} topics`
    )
  }
  onMount(() => (mounted = true))
</script>

<nav class="subnavigation wide-container text-2xl">
  <ul class="topics">
    {#if navTopics}
      {#each navTopics as slug}
        <li class="item" class:selected={$filterTopic === slug}>
          <a
            href={'/topic/' + slug}
            on:click={() => ($filterTopic = slug || '')}
          >
            <span class:transparent={$filterTopic !== slug}
              >#{getTitle(slug)}</span
            >
          </a>
        </li>
      {/each}
    {/if}
  </ul>
</nav>

<style lang="scss">
  .subnavigation {
    @include font-size(1.5rem);
    margin-bottom: 2.4rem;

    .topics {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .item {
      margin-right: 2.4rem;

      &:last-child {
        margin-right: 0;
      }
    }

    .selected {
      color: black;
    }

    a {
      color: #141414;
    }
    a:hover {
      font-weight: 500;
    }
  }
</style>
