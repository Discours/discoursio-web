<script lang="ts">
  import type { Shout } from '$lib/codegen'

  import ShoutCard from './ShoutCard.svelte'

  export let shouts5: Shout[]
</script>

<div class="floor floor--1">
  <div class="wide-container row">
    <div class="col-md-3">
      {#each shouts5.slice(0, 2) as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
    <div class="col-md-6">
      <ShoutCard shout={shouts5[2]} />
    </div>
    <div class="col-md-3">
      {#each shouts5.slice(3, 5) as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
  </div>
</div>
