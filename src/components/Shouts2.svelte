<script lang="ts">
  import type { Shout } from '$lib/codegen'
  import ShoutCard from './ShoutCard.svelte'

  export let shouts: Shout[]
  const x = [
    ['6', '6'],
    ['4', '8'],
    ['8', '4']
  ]
  $: y = Math.floor(Math.random() * x.length)
</script>

<div class="floor">
  <div class="wide-container row">
    {#each shouts as shout, i}
      <div class="col-md-{x[y][i]}">
        <ShoutCard
          {shout}
          additionalClass={x[y][i] === '8' ? 'shout-card--with-cover' : ''}
        />
      </div>
    {/each}
  </div>
</div>
