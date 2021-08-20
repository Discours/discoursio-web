<script lang="ts">
  import ShoutCard from '../components/ShoutCard.svelte'
  // import Editor from '../components/Editor.svelte'
  import { shoutlist } from '../stores/zine'

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  //export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  // $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">
  <div class="floor-1 row">
    <div class="col-md-3">
      {#each $shoutlist.slice(0, 2) as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
    <div class="col-md-6">
      {#each $shoutlist.slice(2, 3) as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
    <div class="col-md-3">
      {#each $shoutlist.slice(3, 5) as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .floor-1 .article-card:nth-child(2) .article-card__cover {
    display: none;
  }
</style>
