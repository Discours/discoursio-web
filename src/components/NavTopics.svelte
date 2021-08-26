<script>
  import { onMount } from 'svelte'
  import { noop } from 'svelte/internal'
  import { shoutlist, shoutsMock, currentTopic } from '../stores/zine'

  // getting all the possible topics from shouts
  let ttt = []

  onMount(() => {
    $currentTopic = window.location.hash
  })

$: {
  ttt = []
  $shoutlist.forEach((shout) =>
      shout.topics.forEach((t) => (t in ttt ? noop() : ttt.push(t)))
    )
}

  const navigate = (slug) => {
    // on nav click
    $currentTopic = '#' + slug
    if (slug === '') {
      // @ts-ignore
      $shoutlist = shoutsMock
    } else {
      console.log('filtering on hash topic')
      // @ts-ignore
      $shoutlist = shoutsMock.filter((a) =>
        a.topics.find((t) => t.slug === slug)
      )
    }
    // console.log($shoutlist)
  }
</script>

<nav class="subnavigation wide-container">
  <ul>
    {#each Array.from(ttt) as { slug, title }, index}
      {#if $currentTopic === '#' + slug}
        <li class="selected">{'#' + title.toLowerCase()}</li>
      {:else}
        <li>
          <a href="#{slug}" on:click={() => navigate(slug)}>
            {title.toLowerCase()}
          </a>
        </li>
      {/if}
    {/each}

    {#if $currentTopic !== '#' }
    <li style="width: 100%; text-align: right;">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" on:click={() => navigate('')}>
        {'[все]'}
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
