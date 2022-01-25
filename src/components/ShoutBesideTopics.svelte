<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  import TopicCard from './TopicCard.svelte'
  import { topics } from '../stores/zine'
  export let beside: Shout
  export let slugs: string[]
  export let title = 'Темы'
  export let limit = 4
</script>

<div class="floor floor--9">
  <div class="wide-container row">
    <div class="col-md-4">
      <h4>{title}</h4>
      {#each slugs.slice(0, limit) as slug}
        <TopicCard topic={$topics[slug]} compact={true} />
      {/each}
    </div>
    <div class="col-md-8">
      <ShoutCard shout={beside} />
    </div>
  </div>
</div>
