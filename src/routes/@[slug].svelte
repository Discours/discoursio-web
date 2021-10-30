<script lang="ts" context="module">
	import type { User, Community } from '../graphql/codegen'
	import type { Load } from '@sveltejs/kit'
	import { browser } from '$app/env'

	interface WhoProps {
		user?: User | Partial<User>
		slug: string
	}

	export const load: Load = async ({
		page,
		fetch,
		session,
		stuff,
	}): Promise<{ props: WhoProps | Partial<WhoProps> }> => {
		if (browser) {
			return { props: page.params }
		} else {
			const { slug } = page.params
			const r = await fetch(`/data/@${slug}.json`)
			return { props: { user: await r.json(), slug } }
		}
	}
</script>

<script lang="ts">
	import Author from '../components/Author.svelte'
	import CommunityView from '../components/Community.svelte'
	import { communities, authors } from '../stores/zine'

	export let props: WhoProps
	let author: User | Partial<User>
	let community: Community | Partial<Community>
	let slug = ''

	$: if ($communities && $authors && props.slug) {
		slug = props.slug
		community = <Community>$communities[slug]
		if (!community && props.user) author = props?.user
		if (!author) author = <User>$authors[slug]
	}
</script>

<svelte:head>
	<title>Дискурс : {props.user ? props.user.name : slug}</title>
</svelte:head>

{#if author}
	<Author {author} hasSubscribeButton={true} />
{:else}
	<CommunityView {slug} />
{/if}
