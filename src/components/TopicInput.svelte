<script lang="ts">
	import type { Topic } from '$lib/codegen'

	export let topic: Topic = undefined

	// TODO: a topic input user control
</script>
{#if topic}
<div contenteditable>{topic.slug}</div>
{/if}
