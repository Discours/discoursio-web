<script context="module" lang="ts">
	import type { Shout, Topic, User } from '../lib/codegen'
	export const prerender = true

	interface SlugProps {
		slug: string
		shout?: Shout
		user?: User
		topic?: Topic
	}

	export const load = async ({ page, fetch }): Promise<{ props: SlugProps }> => {
		console.info('app: preloading root slug entity')
		const { slug } = page.params
		let props: SlugProps = { slug }
		const content = !slug.startsWith('@')
		content && console.log(`app: slug ${slug} is content`)
		const fq = await fetch(content? `/${slug}.json`: `/user/${slug.slice(1)}.json`)
		if (fq.ok) {
			const { getShoutBySlug: shout, getUserBySlug: user} = await fq.json()
			props = { shout, user, slug }
		} else {
			if(content) {
				console.info('app: no shout, preloading topic')
				const sq = await fetch(`/topic/${slug}.json`)
				if (sq.ok) {
					const { topicsBySlugs: [topic] } = await fq.json()
					props = { topic, slug }
				}
			}
		}
		console.log(Object.keys(props))
		return { props }
	}
</script>

<script lang="ts">
	import ShoutFull from '../components/ShoutFull.svelte'
	import TopicFull from '../components/TopicFull.svelte'
	import UserFull from '../components/UserFull.svelte'

	export let topic
	export let shout
	export let user
	export let slug
	let title
	let component

	$: if (topic) {
		console.log('[slug]: is topic')
		// console.log(topic)
		// TODO: add community using subdomain
		title = topic.title
		component = TopicFull
	}

	$: if(shout) {
		console.log('[slug]: is shout')
		title = shout.title
		component = ShoutFull
	}

	$: if(user) {
		console.log('[slug]: is user')
		title = slug
		component = UserFull
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} props={{shout, topic, user}} />
