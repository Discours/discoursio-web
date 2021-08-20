<script lang="ts">
  import { shouts } from '../../stores/zine'
  import type { Shout } from '../../graphql/codegen'

  export let params

  let data: Shout
  let slug: string = ''

  $: if ($shouts && params?.shout) {
    slug = params?.shout
    data = <Shout>$shouts[slug]
  }
</script>

<svelte:head><title>Дискурс : {data.title}</title></svelte:head>
<div>{@html data.body}</div>
