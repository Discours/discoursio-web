<script>
  import { onMount } from 'svelte'
  import { noop } from 'svelte/internal'
  import { shoutslist, filterTopic, topics, shouts } from '../stores/zine'

  // getting all the possible topics from shouts
  let ttt = []

  onMount(() => {
    $filterTopic = window.location.hash.replace('#', '')
  })

$: if($shoutslist && $shouts) {
  ttt = []
  $shoutslist.forEach((shout) =>
      shout.topics.forEach((t) => (t in ttt ? noop() : ttt.push(t)))
    )
}

  const navigate = (slug) => {
    // on nav click
    $filterTopic = slug
    if ($filterTopic === '') {
      // @ts-ignore
      ttt = $shoutslist
    } else {
      // console.log('filtering on hash topic')
      // @ts-ignore
      ttt = $shoutslist.filter((a) =>
        a.topics.find((t) => t === slug)
      )
    }
    // console.log($shoutlist)
  }
</script>

<nav class="subnavigation wide-container">
  <ul>
    {#each ttt as t}
      {#if $filterTopic === '#' + t}
        <li class="selected">{'#' + ($topics && $topics[t] ? $topics[t].value : t).toLowerCase()}</li>
      {:else}
        <li>
          <span style="color:transparent">#</span><a href="#{t}" on:click={() => navigate(t)}>
            {($topics && $topics[t] ? $topics[t].value : t).toLowerCase()}
          </a>
        </li>
      {/if}
    {/each}

    {#if $filterTopic !== ''}
    <li style="width: auto; text-align: right;">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" on:click={() => navigate('')}>
        {'[x]'}
      </a>
    </li>
    {/if}
  </ul>
</nav>

<style lang="scss">
  .subnavigation {
    @include font-size(1.7rem);
    margin-top: 2rem;
    margin-bottom: 9rem;

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
