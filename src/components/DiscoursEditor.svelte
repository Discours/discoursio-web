<script lang="ts">
	import { onMount } from 'svelte'

	let Editor
	export let props

	onMount(
		async () => (Editor = await import('discours-editor/src/Editor.svelte'))
	)
</script>

<div><Editor {props} /></div>
