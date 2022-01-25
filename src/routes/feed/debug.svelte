<script lang="ts">
  import NavTopics from '../../components/NavTopics.svelte'
  import { recents } from '../../stores/zine'

  let topics = new Set([])

  $: if ($recents)
    $recents.forEach((s) => {
      s.topics.forEach((t) => topics.add(t.slug))
    })
</script>

<svelte:head><title>Дискурс : Лента</title></svelte:head>

<NavTopics shouts={$recents} />
{#key $recents}
  <pre>{JSON.stringify($recents, null, 2)}</pre>
{/key}
