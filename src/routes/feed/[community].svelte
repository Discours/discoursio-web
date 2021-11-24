<script context="module" lang="ts">
	import type { Community, Topic, Shout, User } from '../../lib/codegen'
	export const prerender = true

	interface CommunityProps {
		slug: string
		community?: Community
        topics?: Topic[],
        shouts?: Shout[],
        authors?: User[]
	}

	export const load = async ({ page, fetch }): Promise<CommunityProps> => {
		const { community: slug } = page.params
		let props: CommunityProps = { slug }
		const fq =  await fetch(`/feed/${slug}.json`)
		if (fq.ok) {
			const { shoutsByCommunity: shouts, topicsByCommunity: topics, community, usersByCommunity: authors } = await fq.json()
			props = { authors, shouts, topics, slug, community }
		}
		return props
	}
</script>
<script lang="ts">
    import CommunityFull from '../../components/CommunityFull.svelte'

    export let props
</script>
<svelte:head><title>{props.community.title}</title></svelte:head>
<CommunityFull {props} />