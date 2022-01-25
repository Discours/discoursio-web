<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  export let shouts: Shout[]
</script>

<div class="floor">
  <div class="wide-container row">
    {#each shouts as shout}
      <div class="col-md-4">
        <ShoutCard {shout} />
      </div>
    {/each}
  </div>
</div>
