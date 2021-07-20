<script lang="ts">
  import NavCats from '../components/NavCategories.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  export let preloaded = [] // FIXME
</script>

<NavCats />

<!-- svelte-ignore a11y-missing-attribute -->
{#each preloaded as shout}
  <ShoutCard {shout} />
{/each}
