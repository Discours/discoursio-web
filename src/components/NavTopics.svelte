<script>
import { onMount } from 'svelte';
import { shouts, topics, currentTopic } from '../stores/zine'

  
  // FIXME: get all the possible topics from shouts
  let ttt = new Set([])
  $: if ($shouts) {
    const keys = Object.keys($shouts)
    keys &&
      keys.forEach((sid) => {
        if ($shouts[sid] && $shouts[sid].topics) {
          $shouts[sid].topics.forEach((topic) => ttt.add(topic))
        }
      })
    // console.log(topi
  }
onMount(() => {
  $currentTopic = window.location.hash
})
const here = (slug) => window && window.location.hash === '#' + slug
</script>

<nav class="subnavigation">
  <ul>
    {#each Array.from(ttt) as {slug, title}, index}
      <li class:selected="{index === 0}">
        {#if $currentTopic === '#' + slug}
          {title.toLowerCase()}
          {:else}
          <a href="#{slug}" on:click={() => $currentTopic = '#' + slug}>{title.toLowerCase()}</a>
        {/if}
      </li>
    {/each}
  </ul>
</nav>

<style lang="scss">
  @import '../styles/variables';
  @import '../../node_modules/bootstrap/scss/vendor/rfs';

  .subnavigation {
    @include font-size(1.7rem);
    margin: 2rem 0 9rem;

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
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
