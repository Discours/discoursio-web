<script context="module">
	export const prerender = false
</script>

<script lang="ts">
	import DiscoursEditor from '../components/DiscoursEditor/index.svelte'
	import TopicInput from '../components/TopicInput.svelte'
	import { page } from '$app/stores'

	export let body = ''
	let topic
	$: topic = $page.params && $page.params.topic
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<TopicInput {topic} />
<DiscoursEditor {body} />
