<script lang="ts">
import type { Shout } from '../graphql/codegen'
import { onMount } from 'svelte'

export let shout: Shout
export let org = 'discours.io'

onMount(() => {
  if(!shout) shout = <Shout>(window as any).SHOUT
})
</script>

<svelte:head>
  <title
    >Дискурс {org === 'discours.io' ? '' : ': ' + org + ' '}: {shout.title}</title
  >
</svelte:head>
<div>{@html shout.body}</div>
