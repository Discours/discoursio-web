<script lang="ts">
  import ShoutCard from './ShoutCard.svelte'
  import type { Shout } from '$lib/codegen'
  export let shouts: Shout[]
</script>

<div class="floor floor--7">
  <div class="wide-container row">
    <h2 class="col-12">Коротко</h2>
    {#each shouts as shout}
      <div class="col-md-6 col-lg-3">
        <ShoutCard
          {shout}
          additionalClass="shout-card--with-cover shout-card--content-top"
        />
      </div>
    {/each}
  </div>
</div>
