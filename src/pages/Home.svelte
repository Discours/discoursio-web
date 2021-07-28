<script lang="ts">
  import NavTopics from '../components/NavTopics.svelte'
  import ShoutCard from '../components/ShoutCard.svelte'
  import Editor from '../components/Editor.svelte'
  import { shouts } from '../stores/zine'
  import { session } from '../stores/auth'
  import { getLocalization } from '../i18n'
  import type { Shout, Role } from '../graphql/codegen'

  const { t } = getLocalization()

  export let topShouts = [] // TODO: topShouts -> shouts ids

  let editingShout: Shout
  let isEditor: boolean


  $: if($shouts) topShouts = Object.keys($shouts) // FIXME: with query

  $: if($session) {
    isEditor = false
    $session.roles.forEach( (role: Role) => {
      if (role.name in ['admin', 'owner', 'editor']) {
        isEditor = true
      }
    })
  }

  const editShout = (slug:string) => {
    editingShout = $shouts[slug]
  }
</script>

<NavTopics />

{#if isEditor && editingShout}
  <Editor shout={editingShout} />
{:else}
  <!-- svelte-ignore a11y-missing-attribute -->
  {#each topShouts as shid }
      <ShoutCard shout={$shouts[shid]} />
    {#if isEditor}<a href="#edit" on:click={() => editShout(shid)}>{$t('Edit')}</a>{/if}
  {/each}
{/if}
