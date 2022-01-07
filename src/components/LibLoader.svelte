<script>
	import { createEventDispatcher } from 'svelte'
    
	const dispatch = createEventDispatcher()
	export let src

	const load = () => {
		dispatch('loaded')
		console.log('lib loaded: ' + src)
	}
</script>

<svelte:head>
	<script {src} on:load={load} on:error={() => dispatch('error')} />
</svelte:head>
