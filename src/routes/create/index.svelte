<script context="module">
	export const prerender = false
</script>

<script lang="ts">
	import DiscoursEditor from '../../components/DiscoursEditor/index.svelte'
	import TopicInput from '../../components/TopicInput.svelte'
	import { body } from '../../stores/editor'
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<article>
	<TopicInput />
	<DiscoursEditor body={$body} collab={false} />
</article>
