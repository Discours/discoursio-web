<script context="module">
  import data from '../../static/shouts.json'
</script>

<svelte:head><title>Дискурс : Лента</title></svelte:head>

<pre>{JSON.stringify(data, null, 2)}</pre>
