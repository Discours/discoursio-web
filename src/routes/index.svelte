<script context="module">
	export const load = async ({ fetch }) => {
		let props = {}
		const recents = await fetch('/feed/recents.json')
		const topMonth = await fetch('/feed/top-month.json')
		const topOverall = await fetch('/feed/top-overall.json')
		const topicsAll = await fetch(`/topic/all.json`)
		// const communitiesAll = await fetch(`/community/all.json`)
		props = topicsAll.ok ? { ...(await topicsAll.json()), ...props } : props
		// props = communitiesAll.ok ? { ...(await communitiesAll.json()), ...props } : props
		props = recents.ok ? { ...(await recents.json()), ...props } : props
		props = topMonth.ok ? { ...(await topMonth.json()), ...props } : props
		props = topOverall.ok ? { ...(await topOverall.json()), ...props } : props
		return { props }
	}
</script>

<script lang="ts">
	import ShoutCard from '../components/ShoutCard.svelte'
	import UserCard from '../components/UserCard.svelte'
	import TopicCard from '../components/TopicCard.svelte'
	// import CommunityCard from '../components/CommunityCard.svelte'
	import {
		comments,
		shouts,
		shoutslist,
		// communitieslist,
		topicslist,
		topics
	} from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { onMount } from 'svelte'

	export let recents = []
	export let topMonth = []
	export let topOverall = []
	export let topicsAll = []
	// export let communitiesAll = []

	let topCommented = [],
		topViewed = [],
		authorsMonth = [],
		topicsMonth = []

	let tslugs: Set<string> = new Set([])
	let aslugs: Set<string> = new Set([])
	// $: if(!$communitieslist && communitiesAll) $communitieslist

	$: if (!$shoutslist && !$topicslist) {
		$shoutslist = [...recents, ...topMonth, ...topOverall]
		$shoutslist.forEach((s) => ($shouts[s.slug] = s))
		$shoutslist = Object.values($shouts)
		console.log(
			'mainpage: ' + $shoutslist.length.toString() + ' shouts preloaded'
		)

		// top viwed and commented
		topViewed = $shoutslist.sort((a, b) => a['views'] - b['views'])
		topCommented = topViewed // $shoutslist.sort((a, b) => a['comments'] - b['comments']) // FIXME
		topicsAll.forEach((t) => ($topics[t.slug] = t))
		$topicslist = Object.values($topics)
		console.log('mainpage: ' + topicsAll.length.toString() + ' topics preloaded')
		// console.log($topicslist)
		topMonth.forEach((s) => {
			s.authors.forEach((a) => {
				if (!aslugs.has(a.slug)) {
					aslugs.add(a.slug)
					authorsMonth.push(a)
				}
			})
			s.topics.forEach((t) => {
				if (!tslugs.has(t.slug)) {
					tslugs.add(t.slug)
					topicsMonth.push($topics[t.slug])
				}
			})
		})
		topicsMonth = topicsMonth.sort((a,b) => a['topicStat'].authors - b['topicStat'].authors)
		authorsMonth = authorsMonth.sort((a, b) => a['rating'] - b['rating'])
	}

	onMount(() => {
		$shoutslist = null
		$topicslist = null
	}) // force to update reactive code on mount
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>
{#if $shoutslist}
	<div class="home">
		{#if tslugs} <NavTopics slugs={tslugs} />{/if}

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
			{#if recents}
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
					<h4>Темы месяца</h4>
					{#each topicsMonth.slice(0, 4) as topic}
						<TopicCard {topic} />
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
					{#each $shoutslist
						.filter((s) => s.topics.map((t) => t.slug).includes('culture'))
						.slice(0, 4) as article}
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
