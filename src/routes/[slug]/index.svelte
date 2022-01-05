<script context="module" lang="ts">
	import type { Shout, User } from '$lib/codegen'
	export const prerender = true

	interface SlugProps {
		slug: string
		shout?: Shout
		user?: User
	}

	const routes = process.env.VITE_ROUTES || []

	export const load = async ({
		params,
		fetch
	}): Promise<{ props: SlugProps }> => {
		const { slug } = params
		let props: SlugProps = { slug }
		const at = slug.startsWith('@')
		if (routes.includes(slug) && !at) return { props }
		else {
			console.log(`[slug]: ${slug}`)
			const fq = await fetch(at ? `/user/${slug.slice(1)}.json` : `/${slug}.json`)
			if (fq.ok) {
				const data = await fq.json()
				props = { ...data, ...props }
			}
			return { props }
		}
	}
</script>

<script lang="ts">
	import ShoutFull from '../../components/ShoutFull.svelte'
	import UserFull from '../../components/UserFull.svelte'

	export let shout
	export let shouts
	export let comments
	export let user
	export let slug
	let title
	let component

	$: if (shout) {
		// console.log('[slug]: is shout')
		title = shout.title
		shout.comments = comments || []
		component = ShoutFull
	}

	$: if (slug.startsWith('@')) {
		// console.log('[slug]: is user')
		title = slug
		component = UserFull
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} props={{ shout, user, shouts }} />
