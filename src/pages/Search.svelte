<script lang="ts">
  import { shouts } from '../stores/zine'
  import ShoutCard from '../components/ShoutCard.svelte'

  // TODO: topAuthors query
</script>

{#each Object.keys($shouts) as shid }
  <ShoutCard shout={$shouts[shid]} />
{/each}
