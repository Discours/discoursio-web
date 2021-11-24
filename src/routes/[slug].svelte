<script context="module">
	export const prerender = true

	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		const content = !slug.startsWith('@')
		const fq =  await fetch(content? `/${slug}.json`: `/user/${slug.slice(1)}.json`)
		if (fq.ok) {
			const data = await fq.json()
			console.log(data)
			props = { ...data, slug }
		} else if(content) {
			const sq = await fetch(`/topic/${slug}.json`)
			if (sq.ok) {
				const data = await fq.json()
				console.log(data)
				props = { ...data, slug }
			}
		}
		return props
	}
</script>

<script lang="ts">
	import ShoutFull from '../components/ShoutFull.svelte'
	import TopicFull from '../components/TopicFull.svelte'
	import UserFull from '../components/UserFull.svelte'
	import CommunityFull from '../components/CommunityFull.svelte'

	export let props
	let title
	let component
	$: if (props) {
		title =
			'shout' in props
				? props.shout.title
				: 'topic' in props
				? props.topic.title
				: 'user' in props
				? props.user.name
				: 'community' in props
				? props.community.title
				: ''
		component = props.shout
			? ShoutFull
			: props.topic
			? TopicFull
			: props.user
			? UserFull
			: props.community
			? CommunityFull
			: null
	}
</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} {props} />
