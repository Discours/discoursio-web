<script context="module" lang="ts">
	export const prerender = true

	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		const q = await fetch(`/topic/${slug}.json`)
		if (q.ok) {
			const data = await q.json()
			props = { ...data, ...props }
		}
		return { props }
	}
</script>

<script lang="ts">
import { topics } from "../../stores/zine"
import TopicFull from "../../components/TopicFull.svelte"
import { page } from "$app/stores"

</script>

<svelte:head><title>Дискурс : {$page.params.slug}</title></svelte:head>
{#if $topics}<TopicFull topic={ $topics[$page.params.slug] } />{/if}