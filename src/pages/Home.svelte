<script lang="ts">
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  // import Editor from '../components/Editor.svelte'
  import { shouts } from '../stores/zine'

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query
</script>

<div class="home">
  <NavTopics />

  <!-- svelte-ignore a11y-missing-attribute -->
  {#each topShouts as shid}
    <ShoutCard shout={$shouts[shid]} />
  {/each}
</div>
