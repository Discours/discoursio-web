<script>
  import { onMount } from 'svelte'
  import { noop } from 'svelte/internal'
  import { shoutslist, filterTopic, topics, shouts } from '../stores/zine'

  // getting all the possible topics from shouts
  let ttt = []

  onMount(() => {
    $filterTopic = window.location.hash.replace('#', '')
  })

  $: if ($shoutslist && $shouts) {
    ttt = []
    $shoutslist.forEach((shout) =>
      shout.topics.forEach((t) => (t in ttt ? noop() : ttt.push(t)))
    )
  }

  const navigate = (slug) => {
    // on nav click
    $filterTopic = slug
    if ($filterTopic === '') {
      ttt = $shoutslist
    } else {
      // console.log('filtering on hash topic')
      ttt = $shoutslist.filter((a) => a.topics.find((t) => t === slug))
    }
    // console.log($shoutlist)
  }
</script>

<nav class="subnavigation wide-container text-2xl">
  <ul class="topics">
    {#each ttt as t}
      {#if $filterTopic === '#' + t}
        <li class="item selected">
          {'#' + ($topics && $topics[t] ? $topics[t].value : t).toLowerCase()}
        </li>
      {:else}
        <li class="item">
          <span style="color:transparent">#</span>
          <a href={'#' + t} on:click={() => navigate(t)}>
            {($topics && $topics[t] ? $topics[t].value : t).toLowerCase()}
          </a>
        </li>
      {/if}
    {/each}

    {#if $filterTopic !== ''}
      <li class="item" style="width: auto; text-align: right;">
        <a href={''} on:click={() => navigate('')}>
          {'[x]'}
        </a>
      </li>
    {/if}
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
