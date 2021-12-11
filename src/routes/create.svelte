<script lang="ts">
	import DiscoursEditor from '../components/DiscoursEditor/index.svelte'
	import type { Shout } from '../lib/codegen'

	let shout: Shout
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<DiscoursEditor />
