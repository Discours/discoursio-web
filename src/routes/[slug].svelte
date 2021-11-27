<script context="module" lang="ts">
	import type { Shout, User } from '../lib/codegen'
	export const prerender = true

	interface SlugProps {
		slug: string
		shout?: Shout
		user?: User
	}

	export const load = async ({ page, fetch }): Promise<{ props: SlugProps }> => {
		console.info('[slug]: preloading')
		const { slug } = page.params
		let props: SlugProps = { slug }
		const at = slug.startsWith('@')
		console.log(`[slug]: ${at?'user':'shout'} ${slug}`)
		const fq = await fetch(at ? `/user/${slug.slice(1)}.json` : `/${slug}.json`)
		if (fq.ok) props = { ...(await fq.json()), ...props }
		return { props }
	}
</script>

<script lang="ts">
	import ShoutFull from '../components/ShoutFull.svelte'
	import UserFull from '../components/UserFull.svelte'

	export let shout
	export let user
	export let slug
	let title
	let component

	$: if (shout) {
		console.log('[slug]: is shout')
		title = shout.title
		component = ShoutFull
	}

	$: if (user) {
		console.log('[slug]: is user')
		title = slug
		component = UserFull
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} props={{ shout, user }} />
