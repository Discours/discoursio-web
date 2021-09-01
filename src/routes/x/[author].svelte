<script lang="ts" context="module">
	import type { User } from '../../graphql/codegen'
	export async function load({ page, fetch }) {
		const { author } = page.params
		const user: User = await fetch(`/x/${author}.json`).then((r) => r.json())
		return {
			props: { user }
		}
	}
</script>
<script lang="ts">
import Author from '../../components/Author.svelte'
export let props
</script>
<svelte:head><title>Дискурс : {props.user? props.user.viewname : 'Автор'}</title></svelte:head>
{#if props.user}<Author author={props.user} />{/if}
