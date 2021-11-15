<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit'

	// see https://kit.svelte.dev/docs#loading
	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/data/recents.json')
		if (res.ok) {
			console.log(res)
			const { recents } = await res.json()
			return {
				props: { recents }
			}
		}
		const { message } = await res.json()
		return {
			error: new Error(message)
		}
	}
</script>

<script lang="ts">
	import ShoutCard from '../components/ShoutCard.svelte'
	import UserCard from '../components/UserCard.svelte'
	import UserCommunity from '../components/UserCommunity.svelte'
	import {
		comments,
		authors,
		topics,
		topicslist,
		shouts,
		shoutslist,
		communitieslist,
		topMonth,
		topOverall,
		recents
	} from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { onMount } from 'svelte'
	import { loading, endpoint } from '../stores/app'

	export let props

	$: $recents = props.recents

	onMount(async () => {
		$loading = true
		if (window.location.hostname !== 'build.discours.io') {
			console.log('app: using testing graphql endpoint')
			$endpoint = 'http://localhost:8000' // testing only
		}

		// $recents = await (await fetch('/data/recents.json')).json()
		// $topMonth = await (await fetch('/data/top-month.json')).json()
		// $topOverall = await (await fetch('/data/top-overall.json')).json()
		$shoutslist = Array.from(
			new Set($recents.concat($topMonth).concat($topOverall))
		) // removing dublicates
	})

	let topViewed = []
	$: topViewed = $shoutslist.sort((a, b) => a['views'] - b['views'])

	let topRated = []
	$: topRated = $shoutslist.sort((a, b) => a['rating'] - b['rating'])

	let topCommented = []
	$: topCommented = $shoutslist.sort(
		(a, b) =>
			($comments[a['slug']] ? $comments[a['slug']].length : 0) -
			($comments[b['slug']] ? $comments[b['slug']].length : 0)
	)

	let authorsMonth = []
	$: authorsMonth = Array.from(authorsMonthSet).sort(
		(a, b) => a['rating'] - b['rating']
	)

	let authorsMonthSet = new Set([])
	$: if ($topMonth && authorsMonth === []) {
		$topMonth.forEach((s) => {
			s['authors'].forEach((a) => {
				authorsMonthSet.add($authors[a['slug']])
			})
		})
		$loading = false
	}

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
{#if $loading}
	<div class="home">
		{#if $topicslist.length > 0}
			<NavTopics />
		{/if}

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
						<UserCard {user} hasSubscribeButton={true} />
					{/each}

					<button class="button">Еще авторы</button>
				</div>
			</div>
		</div>

		<div class="floor floor--7">
			{#if $recents.length > 0}
				<div class="wide-container row">
					<h2 class="col-12">Коротко</h2>
					{#each $recents.slice(0, 4) as article}
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
				{#each topRated.slice(0, 4) as article}
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
						<UserCommunity slug={community['slug']} />
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
