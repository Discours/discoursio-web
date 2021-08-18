<script lang="ts">
  import { shouts } from '../stores/zine'
  import ShoutTeaser from '../components/ShoutTeaser.svelte'

  let teasers = []
  $: if ($shouts) teasers = Object.keys($shouts)

  // TODO: topAuthors query
</script>

<div class="results">
  {#await $shouts}
    Загрузка...
  {:then}
    {#each teasers as shid}
      <ShoutTeaser shout={$shouts[shid]} />
    {/each}
  {/await}
</div>

<style>
  .results {
    width: 100%;
    overflow-y: scroll;
  }
</style>
