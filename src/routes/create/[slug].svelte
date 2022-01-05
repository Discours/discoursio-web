<script context="module">
	export const prerender = false
    export const load = async ({ params }) => {
		const { topic } = params
        return { props: { topic } }
    }
</script>

<script lang="ts">
    import type { Topic } from '$lib/codegen'
    import { XmlFragment } from 'yjs'
	import DiscoursEditor from '../../components/DiscoursEditor/index.svelte'
	import TopicInput from '../../components/TopicInput.svelte'
    import { topics, topicslist } from '../../stores/zine'

    export let slug
    let topic: Topic

    $: if($topicslist && $topicslist.length > 0) {
        topic = $topics[slug]
    }
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<TopicInput {topic} />
<DiscoursEditor body={new XmlFragment()} collab={false} />
