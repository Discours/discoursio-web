<script lang="ts">
	import EditorSSR from 'discours-editor/src/Editor.svelte'
	import { onMount } from 'svelte'
	export let props
	let Editor

	onMount(async () => {
		Editor = EditorSSR
	})
</script>

{#await (Editor = import('discours-editor/src/Editor.svelte'))}
	<div><Editor {props} /></div>
{/await}
