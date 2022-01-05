<script lang="ts">
	import NavTopics from '../../components/NavTopics.svelte'
	import { shoutslist } from '../../stores/zine'

	let topics = new Set([])

	$: if ($shoutslist)
		$shoutslist.forEach((s) => {
			s.topics.forEach((t) => topics.add(t.slug))
		})
</script>

<svelte:head><title>Дискурс : Лента</title></svelte:head>

<NavTopics slugs={topics} />
{#key $shoutslist}
<pre>{JSON.stringify($shoutslist, null, 2)}</pre>
{/key}
