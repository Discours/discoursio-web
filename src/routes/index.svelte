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
		communitieslist
	} from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { onMount } from 'svelte'
	import { api, endpoint } from '../stores/common'
	import { RECENT_SHOUTS, TOP_MONTH, TOP_OVERALL } from '../graphql/queries'

	onMount(async () => {
		if (window.location.hostname !== 'build.discours.io') {
			console.log('app: using testing graphql endpoint')
			$endpoint = 'http://localhost:8000' // testing only
		}
		console.log('homepage: getting mainpage shouts')
		await $api
		let r = await $api.request(RECENT_SHOUTS, { limit: 100 })
		$shoutslist = r.recents
		// (await $api.request(TOP_MONTH, { limit: 100 })).topMonth
		//topOverall: (await $api.request(TOP_OVERALL, { limit: 100 })).topOverall
		console.log($shouts)
		// $shoutslist = [...$shouts.recents, ...$shouts.topMonth, ...$shouts.topOverall]
		console.log(`homepage: loaded ${$shoutslist.length} shouts`)
	})

	const recent = () => {
		// returns recently updated articles (default)
		return $shouts.recents
	}

	const topViewed = () => {
		// returns top viewed
		return $shoutslist.sort((a, b) => a['views'] - b['views'])
	}

	const topRated = () => {
		// TODO: ??
		// now: top by rating
		return $shoutslist.sort((a, b) => a['rating'] - b['rating'])
	}

	const topCommented = () => {
		// now: serving важное
		return $shoutslist.sort(
			(a, b) =>
				($comments[a['slug']] ? $comments[a['slug']].length : 0) -
				($comments[b['slug']] ? $comments[b['slug']].length : 0)
		)
	}

	const isThisMonth = (date) => {
		const when = Date.parse(date)
		const now = Date.now()
		return now - when < 1000 * 60 * 60 * 24 * 30
	}

	const topAuthors = () => {
		// TODO: top 4 authors in last month
		// now: returns 4 most rated authors
		let authorsMonth = new Set([])
		$shoutslist.forEach((s) => {
			if (isThisMonth(s['createdAt'])) {
				s['authors'].forEach((a) => {
					authorsMonth.add($authors[a['slug']])
				})
			}
		})
		return Array.from(authorsMonth).sort((a, b) => a['rating'] - b['rating'])
	}
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>

<div class="home">
	{#if $topicslist.length > 0}
		<NavTopics slugs={Object.keys($topics).sort()} />
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
				{#each $shoutslist.slice(5, 6) as article}
					<ShoutCard shout={article} />
				{/each}
			</div>
			<div class="col-md-6">
				<h4>Самое читаемое</h4>
				{#each topViewed().slice(0, 4) as article}
					<ShoutCard shout={article} />
				{/each}
			</div>
		</div>
	</div>

	<div class="floor floor--3">
		<div class="wide-container row">
			{#each $shoutslist.slice(10, 13) as article}
				<div class="col-md-4">
					<ShoutCard shout={article} />
				</div>
			{/each}
		</div>
	</div>

	<div class="floor floor--important">
		<div class="wide-container row">
			<h2 class="col-12"><span>Важное</span></h2>
			{#each topCommented().slice(0, 4) as article}
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

				{#each topAuthors().slice(0, 4) as user}
					<UserCard {user} hasSubscribeButton={true} />
				{/each}

				<button class="button">Еще авторы</button>
			</div>
		</div>
	</div>

	<div class="floor floor--7">
		<div class="wide-container row">
			<h2 class="col-12">Коротко</h2>
			{#each recent().slice(0, 4) as article}
				<div class="col-md-6 col-lg-3">
					<ShoutCard shout={article} />
				</div>
			{/each}
		</div>
	</div>

	<div class="floor floor--important">
		<div class="wide-container row">
			<h2 class="col-12"><span>Избранное</span></h2>
			{#each topRated().slice(0, 4) as article}
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
				{#each $shoutslist
					.filter((s) => (s['topics'] || []).includes('culture'))
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
