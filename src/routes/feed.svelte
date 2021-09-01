<script context="module">
  import data from '../../static/shouts.json'
  import NavTopics from '../components/NavTopics.svelte'
</script>

<svelte:head><title>Дискурс : Лента</title></svelte:head>

<NavTopics />
<pre>{JSON.stringify(data, null, 2)}</pre>
