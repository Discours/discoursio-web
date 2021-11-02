<script lang="ts">
	import DiscoursEditor from '../components/DiscoursEditor.svelte'
	import type { Shout } from '../graphql/codegen'

	let shout: Shout
</script>

<svelte:head><title>Дискурс : Редакция</title></svelte:head>
<DiscoursEditor props={{}} />
<div style="margin: 3vw;">
	Инструмент совместного редактирования находится в разработке.
</div>
