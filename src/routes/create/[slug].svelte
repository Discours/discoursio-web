<script context="module">
  export const prerender = false
  export const load = async ({ params }) => {
    const { topic } = params
    return { props: { topic } }
  }
</script>

<script lang="ts">
  import { XmlFragment } from 'yjs'
  
  import DiscoursEditor from '../../components/DiscoursEditor/index.svelte'
  import TopicInput from '../../components/TopicInput.svelte'
  import { shouts } from '../../stores/zine'

  export let slug

  $: topic = $shouts[slug]?.mainTopic
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<article>
  <TopicInput {topic} />
  <DiscoursEditor body={new XmlFragment()} collab={false} />
</article>
