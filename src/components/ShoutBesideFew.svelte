<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'

  export let shouts: Shout[]
  export let title = 'Интересное'
  export let limit = 4
</script>

<div class="floor floor--9">
  <div class="wide-container row">
    <div class="col-md-4">
      <h4>{title}</h4>
      {#each shouts.slice(1, limit) as shout}
        <ShoutCard {shout} isGroup={true} />
      {/each}
    </div>
    <div class="col-md-8">
      <ShoutCard shout={shouts[0]} />
    </div>
  </div>
</div>
