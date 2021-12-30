<script lang="ts">
	import type { Topic } from '$lib/codegen'

	export let topic: Topic

	// TODO: a topic input user control
</script>

<div contenteditable>{topic.slug}</div>
