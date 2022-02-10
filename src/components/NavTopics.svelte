<script lang="ts">
  import { filterTopic } from '../stores/zine'
  import type { Topic } from '$lib/codegen'

  export let topics
</script>

<nav class="subnavigation wide-container text-2xl">
  <ul class="topics">
    {#each topics as t}
      <li class="item" class:selected={$filterTopic === t.slug}>
        <a
          href={'/topic/' + t.slug}
          on:click={() => ($filterTopic = t.slug || '')}
        >
          <span class:transparent={$filterTopic !== t.slug}
            >#{t.title}</span
          >
        </a>
      </li>
    {/each}
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
