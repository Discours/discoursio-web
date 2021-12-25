<script lang="ts" context="module">
	import type { Shout, User } from '../../lib/codegen'
	export const prerender = true

	interface MyFeedProps {
		shouts?: Shout[]
		users?: User[]
		authors?: string[]
		topics?: string[]
	}

	export const load = async ({
		locals,
		fetch
	}): Promise<{ props: MyFeedProps }> => {
		let props: MyFeedProps = {}
		if (locals && locals.cookies) {
			const { topics: topicslugs, authors: authorslugs } = locals.cookies
			let topics, authors, shouts
			if (authorslugs) {
				const aq = await fetch(`/feed/authors.json`)
				if (aq.ok) authors = { ...(await aq.json()), ...authors }
			}
			if (topicslugs) {
				const sq = await fetch(`/topic/by-slugs.json`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({ slugs: topicslugs })
				})
				if (sq.ok) props = { ...(await sq.json()), authors }
				topicslugs.forEach(async (topic) => {
					const tq = await fetch(`/feed/by-topic.json`)
					if (tq.ok) props = { ...props, ...(await tq.json()), authors }
				})
			}
		}
		return { props }
	}
</script>

<script lang="ts">
	import FeedShouts from '../../components/FeedShouts.svelte'
	import NavTopics from '../../components/NavTopics.svelte'
	import FeedAuthors from '../../components/FeedAuthors.svelte'

	export let topics: string[] // slugs
	// export let authors: string[] // slugs
	export let users: User[]
	export let shouts: Shout[]
</script>

{#if topics}<NavTopics slugs={new Set(topics)} />{/if}
{#if shouts}<FeedShouts {shouts} />{/if}
{#if users}<FeedAuthors authors={users} />{/if}
