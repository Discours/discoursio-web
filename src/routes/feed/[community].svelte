<script context="module" lang="ts">
	import type { Community, Shout, User } from '../../lib/codegen'
	export const prerender = true

	interface CommunityProps {
		slug: string
		community?: Community
		shouts?: Shout[]
		authors?: User[]
	}

	export const load = async ({
		page,
		fetch
	}): Promise<{ props: CommunityProps }> => {
		const { community: slug } = page.params
		let props: CommunityProps = { slug }
		const fq = await fetch(`/feed/${slug}.json`)
		if (fq.ok) {
			const {
				shoutsByCommunity: shouts,
				community,
				usersByCommunity: authors
			} = await fq.json()
			props = { authors, shouts, slug, community }
		}
		return { props }
	}
</script>

<script lang="ts">
	import CommunityFull from '../../components/CommunityFull.svelte'

	export let community
	export let shouts
	export let authors
</script>

<svelte:head><title>{community.title}</title></svelte:head>
<CommunityFull props={{ community, shouts, authors }} />
