<script context="module" lang="ts">
	import type { Shout, User } from '../lib/codegen'
	export const prerender = true

	const routes: string[] = [
		'inbox', 'rules', 'agreement', 'search',
		'create', 'login', 'topic', 'feed', 'user']

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
		console.log(`[slug]: ${at ? 'author' : 'shout'} ${slug}`)
		if (routes.includes(slug) && !at) return { props }
		const fq = await fetch(at ? `/user/${slug.slice(1)}.json` : `/${slug}.json`)
		if (fq.ok) props = { ...(await fq.json()), ...props }
		return { props }
	}
</script>

<script lang="ts">
	import ShoutFull from '../components/ShoutFull.svelte'
	import UserFull from '../components/UserFull.svelte'
	import TopicFull from '../components/TopicFull.svelte'
	import { topics } from '../stores/zine'

	export let shout
	export let comments
	export let user
	export let slug
	let topic
	let title
	let component

	$: if (Object.keys($topics).includes(slug)) {
		console.log('[slug]: is topic')
		title = topic.title
		component = TopicFull
	} else {
		if (shout) {
			console.log('[slug]: is shout')
			title = shout.title
			shout.comments = comments || []
			component = ShoutFull
		}
		if (user) {
			console.log('[slug]: is user')
			title = slug
			component = UserFull
		}
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} props={{ shout, user, topic }} />
