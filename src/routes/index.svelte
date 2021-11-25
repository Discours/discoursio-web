<script context="module">
	export const load = async ({ fetch }) => {
		let props = {}
		const recents = await fetch('/feed/recents.json')
		const topMonth = await fetch('/feed/top-month.json')
		const topOverall = await fetch('/feed/top-overall.json')
		props = recents.ok ? { ...(await recents.json()), ...props } : props
		props = topMonth.ok ? { ...(await topMonth.json()), ...props } : props
		props = topOverall.ok ? { ...(await topOverall.json()), ...props } : props
		return { props }
	}
</script>

<script lang="ts">
	import ShoutCard from '../components/ShoutCard.svelte'
	import UserCard from '../components/UserCard.svelte'
	import CommunityCard from '../components/CommunityCard.svelte'
	import { comments, authors, shoutslist, communitieslist } from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { onMount } from 'svelte'

	export let recents = []
	export let topMonth = []
	export let topOverall = []

	let topCommented = [],
		topViewed = [],
		authorsMonth = [],
		authorsMonthSet = new Set([])

	let topicslugs

	$: if (!$shoutslist) {
		console.log('app: mainpage data is ready, preparing...')
		$shoutslist = Array.from(new Set([...recents, ...topMonth, ...topOverall]))
		topicslugs = new Set([])
		$shoutslist.forEach(s => s.topics.forEach(t => topicslugs.add(t.slug)))
		topicslugs = Array.from(topicslugs)
		topViewed = $shoutslist.sort((a, b) => a['views'] - b['views'])
		topCommented = $shoutslist.sort(
			(a, b) =>
				($comments[a['slug']] ? $comments[a['slug']].length : 0) -
				($comments[b['slug']] ? $comments[b['slug']].length : 0)
		)
		authorsMonth = Array.from(authorsMonthSet).sort(
			(a, b) => a['rating'] - b['rating']
		)
		if (topMonth && authorsMonth == []) {
			topMonth.forEach((s) => {
				s['authors'].forEach((a) => {
					authorsMonthSet.add($authors[a['slug']])
				})
			})
		}
	}

	onMount(() => $shoutslist = null) // force to update reactive code on mount

	const onlyTopic = (topic) => {
		// .filter((s) => (s['topics'] || []).includes('culture'))
		let filtered = []
		$shoutslist.forEach((s) => {
			if (s.topics.map((t) => t.slug).includes(topic)) filtered.push(s)
		})
		return filtered
	}
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>
{#if $shoutslist}
	<div class="home">
		<NavTopics slugs={topicslugs} />

		<div class="floor floor--1">
			<div class="wide-container row">
				<div class="col-md-3">
					{#each $shoutslist.slice(0, 2) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
				<div class="col-md-6">
					{#each $shoutslist.slice(2, 3) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
				<div class="col-md-3">
					{#each $shoutslist.slice(3, 5) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
			</div>
		</div>

		<div class="floor floor--2">
			<div class="wide-container row">
				<div class="col-md-6">
					{#each $shoutslist.slice(5, 6) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
				<div class="col-md-6">
					<h4>Самое читаемое</h4>
					{#each topViewed.slice(0, 4) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
			</div>
		</div>

		<div class="floor floor--3">
			<div class="wide-container row">
				{#each $shoutslist.slice(10, 13) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--important">
			<div class="wide-container row">
				<h2 class="col-12"><span>Важное</span></h2>
				{#each $shoutslist.slice(0, 4) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--5">
			<div class="wide-container row">
				{#each $shoutslist.slice(16, 18) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--6">
			<div class="wide-container row">
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[19]} />
				</div>
				<div class="col-md-4">
					<h4>Авторы месяца</h4>

					{#each authorsMonth.slice(0, 4) as user}
						<UserCard {user} />
					{/each}

					<button class="button">Еще авторы</button>
				</div>
			</div>
		</div>

		<div class="floor floor--7">
			{#if recents && recents.length > 0}
				<div class="wide-container row">
					<h2 class="col-12">Коротко</h2>
					{#each recents.slice(0, 4) as article}
						<div class="col-md-6 col-lg-3">
							<ShoutCard shout={article} />
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="floor floor--important">
			<div class="wide-container row">
				<h2 class="col-12"><span>Избранное</span></h2>
				{#each topOverall.slice(0, 4) as article}
					<div class="col-md-3">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--9">
			<div class="wide-container row">
				<div class="col-md-4">
					<h4>Популярные сообщества</h4>
					{#each $communitieslist as community}
						<CommunityCard {community} />
					{/each}
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[28]} />
				</div>
			</div>
		</div>

		<div class="floor floor--10">
			<div class="wide-container row">
				{#each $shoutslist.slice(20, 23) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--2">
			<div class="wide-container row">
				<div class="col-md-6">
					<ShoutCard shout={$shoutslist[27]} />
				</div>
				<div class="col-md-6">
					<h4>Самое обсуждаемое</h4>
					{#each $shoutslist.slice(21, 24) as article}
						<ShoutCard shout={article} />
					{/each}
				</div>
			</div>
		</div>

		<div class="floor floor--teaser">
			<div class="wide-container row">
				<div class="col-md-12">
					<ShoutCard shout={$shoutslist[33]} />
				</div>
			</div>
		</div>

		<div class="floor floor--11">
			<div class="wide-container row">
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[11]} />
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[23]} />
				</div>
			</div>
		</div>

		<div class="floor floor--12">
			<div class="wide-container row">
				<div class="col-md-4">
					<h4>Культура</h4>
					{#each onlyTopic('culture').slice(0, 4) as article}
						<ShoutCard shout={article} />
					{/each}
				</div>
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[33]} />
				</div>
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[22]} />
				</div>
			</div>
		</div>

		<DiscoursBanner />

		<div class="floor floor--10">
			<div class="wide-container row">
				{#each $shoutslist.slice(26, 27) as article}
					<div class="col-md-426">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.floor {
		margin-bottom: 6.4rem;

		.wide-container {
			padding: 0;
		}
	}

	.floor--important {
		background: #000;
		color: #fff;
	}
</style>
