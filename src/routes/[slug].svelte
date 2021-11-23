<script context="module">
	export const prerender = true
	
	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		if(slug.startsWith('@')) {
			const sign = await fetch(`/data/@${slug}.json`)
			props = sign.ok ? { ...(await sign.json()), ...props } : props
		} else {
			const content = await fetch(`/data/=${slug}.json`)
			props = content.ok ? { ...(await content.json()), ...props} : props
		}
		console.log(props)
		return { props }
	}
</script>

<script lang="ts">
import ShoutFull from '../components/ShoutFull.svelte';
import TopicFull from '../components/TopicFull.svelte';
import UserFull from '../components/UserFull.svelte';
import CommunityFull from '../components/CommunityFull.svelte';

export let props
let title
let component
$: title = props.shout ? props.shout.title : props.topic ? props.topic.name : props.user ? props.user.name : props.community ? props.community.title : ''
$: component = props.shout ? ShoutFull : props.topic ? TopicFull : props.user ? UserFull : props.community ? CommunityFull : null 

</script>

<svelte:head><title>Дискурс{title ? ' : ' + title : ''}</title></svelte:head>
<svelte:component this={component} {props} />
