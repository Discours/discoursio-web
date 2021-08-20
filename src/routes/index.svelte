<script lang="ts">
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  // import Editor from '../components/Editor.svelte'
  import { shouts } from '../stores/zine'
  import articlesData from '../data/articles.json'

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  export let topShouts: string[] = [] // TODO: topShouts -> shouts ids

  $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query

</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">

  <div class="floor-1 row">
    <div class="col-md-3">
      {#each articlesData.slice(0, 2) as article}
        <ShoutCard shout="{article}"/>
      {/each}
    </div>
    <div class="col-md-6">
      {#each articlesData.slice(2, 3) as article}
        <ShoutCard shout="{article}"/>
      {/each}
    </div>
    <div class="col-md-3">
      {#each articlesData.slice(3, 5) as article}
        <ShoutCard shout="{article}"/>
      {/each}
    </div>
  </div>

  <!-- svelte-ignore a11y-missing-attribute -->
  {#each topShouts as shid}
    <ShoutCard shout={$shouts[shid]} />
  {/each}
</div>
