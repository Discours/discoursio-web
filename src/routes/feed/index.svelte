<script context="module">
	import NavTopics from '../../components/NavTopics.svelte'
	import { shouts } from '../../stores/zine'
</script>

<svelte:head><title>Дискурс : Лента</title></svelte:head>

<NavTopics />
<pre>{JSON.stringify($shouts, null, 2)}</pre>
