<script lang="ts">
	export let props
	let Editor

	import('discours-editor/src/Editor.svelte').then((sv) => (Editor = sv))
</script>

{#await Editor}
	<div><svelte:component this={Editor} {props} /></div>
{/await}
