<script>
  import { onMount } from 'svelte'
  import { noop } from 'svelte/internal'
  import { shoutlist, shoutsMock, currentTopic } from '../stores/zine'

  // getting all the possible topics from shouts
  let ttt = []

  onMount(() => {
    $currentTopic = window.location.hash
    ttt = [{ slug: '', title: 'Все' }]
    $shoutlist.forEach((shout) =>
      shout.topics.forEach((t) => (t in ttt) ? noop(): ttt.push(t))
    )
  })

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

<nav class="subnavigation">
  <ul>
    {#each Array.from(ttt) as { slug, title }, index}
      {#if $currentTopic === '#' + slug}
        <li class="selected">{title.toLowerCase()}</li>
      {:else}
        <li>
          <a href="#{slug}" on:click={() => navigate(slug)}>
            {title.toLowerCase()}
          </a>
        </li>
      {/if}
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
