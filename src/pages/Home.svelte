<script lang="ts">
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  // import Editor from '../components/Editor.svelte'
  import { shouts } from '../stores/zine'
  import { orgRole, AS } from '../stores/auth'
  import { org } from '../stores/common'
  import type { Shout } from '../graphql/codegen'

  import { getLocalization } from '../i18n'

  const { t } = getLocalization()
  export let location

  // {#if false && isEditor && editingShout}
  //  <Editor shout={editingShout} />
  // {:else}

  export let topShouts = [] // TODO: topShouts -> shouts ids

  let editingShout: Shout

  $: if ($shouts) topShouts = Object.keys($shouts) // FIXME: with query

  const editShout = (slug: string) => {
    editingShout = $shouts[slug]
    console.log(location)
  }
</script>

<div class="home">
  <NavTopics />

  <!-- svelte-ignore a11y-missing-attribute -->
  {#each topShouts as shid}
    <ShoutCard shout={$shouts[shid]} />
    {#if $orgRole >= AS.EDITOR}
      <a class="editlink" href="#edit" on:click={() => editShout(shid)}>
        {'Edit'}
      </a>
    {/if}
  {/each}
</div>

<style>
  .editlink {
    padding-left: 3vw;
    float: left;
    font-size: 2vh;
  }
</style>
