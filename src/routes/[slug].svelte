<script context="module" lang="ts">
	import type { Shout, Topic, User } from '../lib/codegen'
	export const prerender = true

	interface SlugProps {
		slug: string
		shout?: Shout
		user?: User
		topic?: Topic
	}

	export const load = async ({ page, fetch }): Promise<SlugProps> => {
		const { slug } = page.params
		let props: SlugProps = { slug }
		const content = !slug.startsWith('@')
		const fq =  await fetch(content? `/${slug}.json`: `/user/${slug.slice(1)}.json`)
		if (fq.ok) {
			const { getShoutBySlug: shout, getUserBySlug: user} = await fq.json()
			console.log( { shout, user })
			props = { shout, user, slug }
		} else if(content) {
			const sq = await fetch(`/topic/${slug}.json`)
			if (sq.ok) {
				const { topicsBySlugs: [topic] } = await fq.json()
				console.log(topic)
				props = { topic, slug }
			}
		}
		return props
	}
</script>

<script lang="ts">
	import ShoutFull from '../components/ShoutFull.svelte'
	import TopicFull from '../components/TopicFull.svelte'
	import UserFull from '../components/UserFull.svelte'

	export let props
	let title
	let component
	$: if (props) {
		// TODO: add community using subdomain
		title =
			props.shout ? props.shout.title
				: props.topic ? props.topic.title
				: props.user ? props.user.name
				: ''
		component = props.shout
			? ShoutFull
			: props.topic
			? TopicFull
			: props.user
			? UserFull
			: null
		console.info(title)
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} {props} />
