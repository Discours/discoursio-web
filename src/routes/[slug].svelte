<script context="module">
	export const prerender = true
	
	export const load = async ({ page, fetch }) => {
		const { slug } = page.params
		let props = { slug }
		const fq = await fetch(`/data/${slug}.json`)
		if(fq.ok) {
			const data = await fq.json()
			console.log(data)
			props = { ...data, slug }
		}
		return props
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
