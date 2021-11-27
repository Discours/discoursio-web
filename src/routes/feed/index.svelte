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
			const { topics, authors } = locals.cookies
			if (authors) {
				const fq = await fetch(`/feed/authors.json`)
				if (fq.ok) props = await fq.json()
			}
			if (topics) {
				const sq = await fetch(`/feed/topics.json`)
				if (sq.ok) {
					const data = await sq.json()
					props = {
						users: props.users,
						shouts: { ...props.shouts, ...data.shouts },
						topics
						// authors
					}
				}
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

{#if topics}<NavTopics slugs={topics} />{/if}
{#if shouts}<FeedShouts {shouts} />{/if}
{#if users}<FeedAuthors authors={users} />{/if}
