<script lang="ts" context="module">
	import type { Shout, User, Topic } from '../../lib/codegen'
	export const prerender = true

	interface MyFeedProps {
        shouts?: Shout[],
        users?: User[],
        topics?: Topic[]
	}

	export const load = async ({ fetch }): Promise<{ props: MyFeedProps }> => {
		let props: MyFeedProps = { }
		const fq =  await fetch(`/feed/my.json`)
		if (fq.ok) props = await fq.json()
		return { props }
	}
</script>

<script lang="ts">
    import FeedShouts from '../../components/FeedShouts.svelte'
    import NavTopics from '../../components/NavTopics.svelte'
	import FeedAuthors from '../../components/FeedAuthors.svelte';

    export let topics: Topic[]
	export let shouts: Shout[]
	export let authors: User[]
</script>
<NavTopics {topics} />
<FeedShouts {shouts} />
<FeedAuthors {authors} />