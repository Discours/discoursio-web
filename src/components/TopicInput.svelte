<script lang="ts">
	import { topicslist, topics } from '../stores/zine'
	import Select from 'svelte-select'

	export let topic = ''
	let items = []
	let value = { label: '', value: '' }
	$: if ($topicslist) {
		items = $topicslist.flatMap((t) => {
			return { value: t.slug, label: t.title }
		})
		const t = $topics[topic]
		if (t) value = { label: t.title, value: t.slug }
	}

	const handleSelect = (event) => {
		console.log('selected item', event.detail)
	}
</script>

<Select
	{items}
	{value}
	on:select={handleSelect}
	placeholder={'Выберите тему'}
/>
