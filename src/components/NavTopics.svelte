<script lang="ts">
  import { shoutslist, filterTopic, topics, topicslist } from '../stores/zine'

  export let slugs = []

  const setTopic = (topic: string) => {
    $filterTopic = topic
  }

  $: if ($topics) $topicslist = Object.values($topics).sort()

  $: if ($shoutslist && $shoutslist.length > 0) {
    let topicset = new Set([])
    $shoutslist.forEach((s) => s.topics.forEach((topic) => topicset.add(topic)))
    slugs = Array.from(topicset).sort()
    if (slugs === Object.keys($topics).sort()) {
      console.info('nav: topics are up to date')
    } else {
      console.info(`nav: updating ${slugs.length} topics`)
      fetch(`/data/topics.json?slugs=${encodeURI(slugs.toString())}`)
        .then((r) =>
          r
            .json()
            .then((data) => ($topics = data))
            .catch(console.error)
        )
        .catch(console.error)
    }
  }
</script>

<nav class="subnavigation wide-container text-2xl">
  <ul class="topics">
    {#each slugs as t}
      {#if $topics[t]}
        <li class="item" class:selected={$filterTopic === t}>
          <a
            href={'#' + t}
            on:click={() => setTopic($filterTopic === t ? '' : t)}
          >
            <span class:transparent={$filterTopic !== t}>#</span>{$topics[
              t
            ].title.toLowerCase()}
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
