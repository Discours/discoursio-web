<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  import { SvelteComponent } from 'svelte'
  export let beside: Shout
  export let slugs: string[]
  export let component
  export let title = 'Темы месяца'
</script>

<div class="floor floor--9">
  <div class="wide-container row">
    <div class="col-md-4">
      <h4>{title}</h4>
      {#each slugs.slice(0, 4) as slug}
        <svelte:component this={component} {slug} compact={true} />
      {/each}
    </div>
    <div class="col-md-8">
      <ShoutCard shout={beside} />
    </div>
  </div>
</div>
