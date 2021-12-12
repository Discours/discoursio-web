<script lang="ts" context="module">
	import type { Topic } from '../../lib/codegen'
	export const prerender = true

	export const load = async ({ fetch }): Promise<{ props: { topics: Partial<Topic>[] } }> => {
		console.log('topic/index: fetching all topics')
		const fq = await fetch(`/topic/all.json`)
		if (fq.ok) {
			const { topics } = await fq.json()
			return { props: { topics } }
		} else return { props: { topics: [] } }
	}
</script>
<script lang="ts">
	export let topics: Partial<Topic>[]
</script>

<h2>Темы</h2>
{#each topics as t}
	<div class="topic">
		<div class="topic-title">{t.title}</div>
	</div>
{/each}