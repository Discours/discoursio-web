<script lang="ts">
	// import EditorSSR from 'discours-editor/src/Editor.svelte'
	import { onMount } from 'svelte'
	export let props
	let Editor

	import('discours-editor/src/Editor.svelte').then((sv) => (Editor = sv))
</script>

{#await Editor}
	<div><Editor {props} /></div>
{/await}
