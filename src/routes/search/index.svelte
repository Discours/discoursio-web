<script lang="ts">
  import ShoutCard from '$lib/components/ShoutCard.svelte'
  import { shouts } from '$lib/stores/zine'

  let teasers = []
  $: if ($shouts) teasers = Object.keys($shouts)

  // TODO: topAuthors query
</script>

<div class="results">
  {#await $shouts}
    Загрузка...
  {:then}
    {#each teasers as shid}
      <ShoutCard shout={$shouts[shid]} />
    {/each}
  {/await}
</div>

<style>
  .results {
    width: 100%;
    overflow-y: scroll;
  }
</style>
