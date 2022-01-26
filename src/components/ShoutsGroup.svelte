<script lang="ts">
  import type { Shout } from '$lib/codegen'
  import ShoutCard from './ShoutCard.svelte'

  export let shouts: Shout[]
</script>

<div class="floor floor--important floor--group">
  <div class="wide-container row">

    <div class="group__header col-12">
      <div class="row">
        <slot name="header" />
      </div>
    </div>

    <div class="col-lg-6">
      <slot name="aside" />
    </div>

    <div class="col-lg-6">
      {#if shouts}
      <div class="row">
        <div class="col-md-6">
          {#each shouts.slice(0, 3) as shout}
            <ShoutCard {shout} noimage={true} />
          {/each}
        </div>
        <div class="col-md-6">
          {#each shouts.slice(3, 6) as shout}
            <ShoutCard {shout} noimage={true} />
          {/each}
        </div>
      </div>
      {/if}

    </div>

  </div>
</div>

<style lang="scss">
  .floor--group {
    .group__header .row {
      align-items: baseline;
    }
  }
</style>
