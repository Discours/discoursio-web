<script lang="ts">
  import { shouts } from '../stores/zine'
  import ShoutTeaser from '../components/ShoutTeaser.svelte'

  // TODO: topAuthors query
</script>

{#each Object.keys($shouts) as shid }
  <ShoutTeaser shout={$shouts[shid]} />
{/each}
