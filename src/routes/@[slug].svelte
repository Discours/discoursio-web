<script lang="ts" context="module">
	import type { User, Community } from '../graphql/codegen'
	import type { Load } from '@sveltejs/kit'
	import { browser } from '$app/env'

	export const prerender = true

	export const load: Load = async ({
		page,
		fetch,
		session,
		stuff,
	}): Promise<any> => {
		if (!browser) {
			const { slug } = page.params
			const r = await fetch(`/data/@${slug}.json`)
			const data = await r.json()
			if (r.status === 200) return { user: data, slug }
			else console.error(r.status, data.message)
		}
		return page.params
	}
</script>

<script lang="ts">
	import UserCard from '../components/UserCard.svelte'
	import UserCommunity from '../components/UserCommunity.svelte'
	import { communities, authors } from '../stores/zine'

	export let slug: string
	export let user: User | Partial<User>
	export let community: Community | Partial<Community>

	$: if ($communities && $authors && slug) {
		community = $communities[slug]
		user = community ? null : <User>$authors[slug]
	}
</script>

<svelte:head>
	<title>Дискурс : {community ? community.name : user ? user.name : slug}</title>
</svelte:head>

{#if user}
	<UserCard {user} hasSubscribeButton={true} />
{:else}
	<UserCommunity {slug} />
{/if}
