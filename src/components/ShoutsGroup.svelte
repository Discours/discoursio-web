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
          {#if shouts.length < 4}
            {#each shouts as shout}
              <div class="row">
                <div class="col-md-8">
                  <ShoutCard {shout} nosubtitle={false} noicon={true} />
                </div>
              </div>
            {/each}
          {:else}
            <div class="col-md-6">
              {#each shouts.slice(0, 2) as shout}
                <ShoutCard {shout} noimage={true} />
              {/each}
            </div>
            <div class="col-md-6">
              {#each shouts.slice(2, 4) as shout}
                <ShoutCard {shout} noimage={true} />
              {/each}
            </div>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .group__header .row {
    align-items: baseline;
  }
</style>
