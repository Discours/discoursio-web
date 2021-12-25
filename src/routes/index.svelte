<script context="module">
	export const load = async ({ fetch }) => {
		let props = {}
		const recents = await fetch('/feed/recents.json')
		const topMonth = await fetch('/feed/top-month.json')
		const topOverall = await fetch('/feed/top-overall.json')
		const topViewed = await fetch(`/feed/top-viewed.json`)
		props = recents.ok ? { ...(await recents.json()), ...props } : props
		props = topMonth.ok ? { ...(await topMonth.json()), ...props } : props
		props = topOverall.ok ? { ...(await topOverall.json()), ...props } : props
		props = topViewed.ok ? { ...(await topViewed.json()), ...props } : props
		return { props }
	}
</script>

<script lang="ts">
	import ShoutCard from '../components/ShoutCard.svelte'
	import UserCard from '../components/UserCard.svelte'
	import TopicCard from '../components/TopicCard.svelte'
	import {
		shouts, 
		topics,
		shoutslist,
		topicslist
	} from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { onMount } from 'svelte'
	import { shuffle } from '../lib/utils'
	import { fade } from 'svelte/transition'
	export let recents = []
	export let topMonth = []
	export let topOverall = []
	export let topViewed = []

	let showedTopics = []
	let topCommented = [],
		authorsMonth = [],
		topicsMonth = [],
		moreTimes = 0
	let loading
	let tslugs: Set<string> = new Set([])
	let aslugs: Set<string> = new Set([])

	const update = async (data) => {
		$shoutslist = data
		$shoutslist.forEach((s) => ($shouts[s.slug] = s))
		// $shoutslist = Object.values($shouts).sort((a, b) => b.createdAt)
		console.log(
			'mainpage: ' + $shoutslist.length.toString() + ' shouts preloaded'
		)
		// top commented from recents
		// topViewed = $shoutslist.sort((a, b) => b['stat'].views - a['stat'].views)
		topCommented = $shoutslist.sort(
			(a, b) => b['stat'].comments - a['stat'].comments
		)
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
		showedTopics = shuffle(Array.from(tslugs)).slice(0, 9)
		topicsMonth = topicsMonth.sort(
			(a, b) => b['topicStat'].authors - a['topicStat'].authors
		)
		authorsMonth = authorsMonth.sort((a, b) => b['rating'] - a['rating'])
	}

	$: if (!$shoutslist && $topicslist) update(recents)

	onMount(() => {
		$shoutslist = null
	}) // force to update reactive code on mount

	let authorsLimit = 8

	const moreAuthors = () => {
		console.log('mainpage: show more authors')
		authorsLimit += 8
	}

	const moreShouts = async () => {
		loading = true
		console.log('mainpage: show more shouts')
		const p = Math.floor($shoutslist.length / 27)
		$shoutslist = Array.from(new Set([ ...$shoutslist, ...topOverall.slice(4, topOverall.length), topViewed.slice(4,topViewed.length)]))
		const r = await fetch('/feed/recents.json?page=' + p)
		if (r.ok) {
			const { recents: newData } = await r.json()
			console.debug(
				'mainpage: ' + newData.length.toString() + ' more shouts loaded'
			)
			$shoutslist = Array.from(new Set([...newData, ...$shoutslist]))
			moreTimes += 1
			loading = false
		}
	}
</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>
{#if $shoutslist}
	<div class="home" transition:fade>
		{#if tslugs} <NavTopics slugs={new Set(showedTopics)} />{/if}

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

		<div class="about-discours">
			<div class="wide-container row">
				<div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
					<h4>Горизонтальная платформа для коллаборативной журналистики</h4>
					<p>
						Дискурс&nbsp;&mdash; это интеллектуальная среда, веб-пространство
						и&nbsp;инструменты, которые позволяют авторам сотрудничать
						с&nbsp;читателями и&nbsp;объединяться для совместного создания публикаций
						и&nbsp;медиа-проектов.
						<br />
						<em
							>Мы&nbsp;убеждены, один голос хорошо, а&nbsp;много&nbsp;&mdash; лучше.
							Самые потрясающие истории мы&nbsp;создаём вместе.</em
						>
					</p>
					<div class="about-discours__actions">
						<a class="button" href="#post">присоединитьсяк&nbsp;сообществу</a>
						<a class="button" href="#post">стать&nbsp;автором</a>
						<a class="button" href="/manifest">о&nbsp;проекте</a>
						<a class="button" href="/help">поддержать&nbsp;платформу</a>
					</div>
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
				{#each $shoutslist.slice(7, 10) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--important">
			<div class="wide-container row">
				<h2 class="col-12"><span>Важное</span></h2>
				{#each $shoutslist.slice(0, 3) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--5">
			<div class="wide-container row">
				{#each $shoutslist.slice(10, 13) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--6">
			<div class="wide-container row">
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[14]} />
				</div>
				<div class="col-md-4">
					<h4>Авторы месяца</h4>

					{#each authorsMonth.slice(0, authorsLimit) as user}
						<div transition:fade><UserCard {user} /></div>
					{/each}
					{#if authorsLimit < authorsMonth.length}
						<button class="button" on:click={moreAuthors}>Еще авторы</button>
					{/if}
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
						<TopicCard {topic} compact={true} />
					{/each}
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[15]} />
				</div>
			</div>
		</div>

		<div class="floor floor--10">
			<div class="wide-container row">
				{#each $shoutslist.slice(16, 19) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--11">
			<div class="wide-container row">
				<div class="col-md-6">
					<ShoutCard shout={$shoutslist[20]} />
				</div>
				<div class="col-md-6">
					<h4>Самое обсуждаемое</h4>
					<ShoutCard shout={topCommented[0]} />
				</div>
			</div>
		</div>

		<div class="floor floor--teaser">
			<div class="wide-container row">
				<div class="col-md-12">
					<ShoutCard shout={$shoutslist[21]} />
				</div>
			</div>
		</div>

		<div class="floor floor--13">
			<div class="wide-container row">
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[22]} />
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[23]} />
				</div>
			</div>
		</div>

		<div class="floor floor--14">
			<div class="wide-container row">
				<h4>Культура</h4>
				{#each $shoutslist
					.filter((s) => s.topics.map((t) => t.slug).includes('culture'))
					.slice(0, 3) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<DiscoursBanner />

		<div class="floor floor--15">
			<div class="wide-container row">
				{#each $shoutslist.slice(26, 27) as article}
					<div class="col-md-426">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>
		{#each [...Array(9).keys()] as r}
			{#if $shoutslist.length >= 27 + r * 3}
				<div class="floor" transition:fade>
					<div class="wide-container row">
						{#each $shoutslist.slice(27 + r * 3, 30 + r * 3) as article}
							<div class="col-md-4" transition:fade>
								<ShoutCard shout={article} />
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{/each}
		<div class="morewrap" transition:fade>
			<div class="show-more">
				<button class="button" type="button" on:click={moreShouts}
					>{loading ? 'Загружаем' : 'Показать еще'}</button
				>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.morewrap {
		flex: 1 58.3333%;
	}
	.show-more {
		margin-bottom: 6.4rem;
		text-align: center;
	}

	.about-discours {
		background: #000;
		color: #fff;
		@include font-size(1.7rem);
		font-weight: 400;
		padding: 6.2em 0;
		margin-bottom: 6.4rem;

		h4 {
			margin-bottom: 4rem;
		}

		em {
			font-weight: inherit;
		}

		.wide-container {
			padding: 0;
		}
	}

	.about-discours__actions {
		margin-top: 4.8rem;

		.button {
			border: 3px solid;
			border-radius: 1.2em;
			font-weight: bold;
			margin-right: 0.3em;
		}
	}
</style>
