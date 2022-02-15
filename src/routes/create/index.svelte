<script context="module">
  export const prerender = false
</script>

<script lang="ts">
  import DiscoursEditor from '$lib/components/DiscoursEditor/index.svelte'
  import TopicInput from '$lib/components/TopicInput.svelte'
  import { body } from '$lib/stores/editor'
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<article>
  <TopicInput />
  <DiscoursEditor body={$body} collab={false} />
</article>
