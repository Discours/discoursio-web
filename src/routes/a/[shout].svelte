<script lang="ts">
import { onMount } from 'svelte'
import type { Shout } from '../../graphql/codegen'

export let data: Shout
export let shout: string
export let org = 'discours.io'

onMount(() => {
  if(!data) data = <Shout>(window as any).SHOUT
})
</script>

<svelte:head>
  <title
    >Дискурс {org === 'discours.io' ? '' : ': ' + org + ' '}: {shout}</title
  >
</svelte:head>
<div>{@html data.body}</div>
