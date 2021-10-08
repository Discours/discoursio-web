<script lang="ts">
  import { onMount } from 'svelte'
  import { shoutslist, filterTopic, topics, topicslist, shouts } from '../stores/zine'
  import type { Shout } from '../graphql/codegen'
  // getting all the possible topics from shouts

  export let data = []

  const setTopic = (topic: string) => {
    $filterTopic = topic
  }
</script>

<nav class="subnavigation wide-container text-2xl">
  <ul class="topics">
    {#each data as t}
      {#if $topics[t]}
        <li class="item" class:selected={$filterTopic === t}>
          <a href={'#' + t} on:click={() => setTopic($filterTopic === t?'':t)}>
            <span class:transparent={$filterTopic !== t}>#</span>{$topics[t].title.toLowerCase()}
          </a>
        </li>
      {/if}
    {/each}
  </ul>
</nav>

<style lang="scss">
  .subnavigation {
    margin-top: 2rem;
    margin-bottom: 9rem;

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
  }
</style>
