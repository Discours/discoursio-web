<script context="module">
	import 'swiper/css'
	import 'swiper/css/navigation'
	export const load = async ({ fetch }) => {
		let props = {}
		const recents = await fetch('/feed/recents.json')
		const topMonth = await fetch('/feed/top-month.json?size=10')
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
	// import CommunityCard from '../components/CommunityCard.svelte'
	import Icon from '../components/DiscoursIcon.svelte'
	import { Navigation } from 'swiper'
	import { Swiper, SwiperSlide } from 'swiper/svelte'
	import {
		shouts,
		topics,
		shoutslist,
		subscribedAuthors,
		topicslist
	} from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { fade } from 'svelte/transition'
	import { loading, openModal } from '../stores/app'
	import ShoutFeed from '../components/ShoutFeed.svelte'
	import { shuffle } from '$lib/utils'
	import SvelteSeo from 'svelte-seo'
	import { browser } from '$app/env'

	export let recents = []
	export let topMonth = []
	export let topOverall = []
	export let topViewed = []
	let topCommented = [],
		topMonthAuthors = [],
		topicsMonth = [],
		shoutsByTopic = {},
		shoutsByLayout = {}
	const authorsLimit = 8
	let tslugs: Set<string> = new Set([])
	let aslugs: Set<string> = new Set([])

	// one topic filtered
	const oneTopic = (filter) =>
		$shoutslist.filter((t) => t.topics.find((topic) => topic.slug === filter))

	$: if($topicslist && browser) console.debug('mainpage: browser environment runtime')

	$: if ($shoutslist === null) {
		$loading = true
		recents.forEach((s) => ($shouts[s.slug] = s))
		topOverall.forEach((s) => ($shouts[s.slug] = s))
		topMonth.forEach((s) => {
			$shouts[s.slug] = s
			s.authors.forEach((a) => {
				if (!aslugs.has(a.slug)) {
					aslugs.add(a.slug)
					topMonthAuthors.push(a)
				}
			})
			s.topics.forEach((t) => {
				if (!tslugs.has(t.slug)) {
					tslugs.add(t.slug)
					topicsMonth.push($topics[t.slug])
				}
			})
		})
		console.log(`mainpage: loaded ${Object.keys($shouts).length} shouts from api`)
		const byDate = (a, b) =>
			new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		$shoutslist = Object.values($shouts).sort(byDate)
		$shoutslist.forEach((s) => {
			s.topics.forEach((t) => tslugs.add(t.slug))
			if (s.layout) {
				if (!shoutsByLayout[s.layout]) shoutsByLayout[s.layout] = new Set([])
				shoutsByLayout[s.layout].add(s)
			}
		})
		console.log(`mainpage: ${Object.keys(shoutsByLayout)}`)
		tslugs.forEach((t) => (shoutsByTopic[t] = oneTopic(t)))
		console.log(`mainpage: ${tslugs.size} topics found`)

		// top commented
		topCommented = recents
			.filter((s) => s.stat.comments > 0)
			.sort((a, b) => b.stat.comments - a.stat.comments)
		console.log(`mainpage: found ${topCommented.length.toString()} commented`)

		// top month topics sorted by authors amount
		const byAuthors = (a, b) => b.topicStat.authors - a.topicStat.authors
		topicsMonth = topicsMonth.sort(byAuthors)

		// top month authors
		const byRating = (a, b) => b.rating - a.rating
		topMonthAuthors = topMonthAuthors.sort(byRating)
		console.log(
			`mainpage: found ${topMonthAuthors.length.toString()} top month authors`
		)
		$loading = false
	}

	// NOTICE: onMount(() => $shoutslist = null) should be triggered by __layout.svelte

	const meta = {
		title: 'Дискурс',
		description: 'Самоорганизующаяся журналистика',
		keywords: 'Discours.io, дискурс, самыздат, коллаборативная редакция, авторы'
	}
</script>

<SvelteSeo
	{...meta}
	openGraph={{
		...meta,
		images: [{ url: 'https://new.discours.io/logo.png' }]
	}}
/>
<svelte:head><title>Дискурс : Главная</title></svelte:head>
{#if $loading}<div class='home'>laoding...</div>
{:else}
	<div class="home" transition:fade>
		{#key recents} <NavTopics shouts={recents} />{/key}

		<div class="floor floor--1">
			<div class="wide-container row">
				<div class="col-md-3">
					{#each $shoutslist.slice(0, 2) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
				<div class="col-md-6">
					<ShoutCard shout={$shoutslist[2]} />
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
						<a class="button" href="#auth" on:click={() => ($openModal = 'auth')}
							>присоединитьсяк&nbsp;сообществу</a
						>
						<a class="button" href="/create">стать&nbsp;автором</a>
						<a class="button" href="/about/manifest">о&nbsp;проекте</a>
						<a class="button" href="/about/help">поддержать&nbsp;платформу</a>
					</div>
				</div>
			</div>
		</div>

		<div class="floor floor--2">
			<div class="wide-container row">
				<div class="col-md-4">
					<h4>Самое читаемое</h4>
					<ul class="top-viewed">
						{#each topViewed.slice(5, 10) as shout}
							<li>
								<div>
									<div class="top-viewed__topic">
										<a href="/topic/{shout.mainTopic}">
											{shout.topics.find((item) => item.slug === shout.mainTopic).title}
										</a>
									</div>
									<div class="top-viewed__shout">
										<a href="/{shout.slug}">
											<h4>{shout.title}</h4>
											{#if shout.subtitle}{shout.subtitle}{/if}
										</a>
									</div>
								</div>
							</li>
						{/each}
					</ul>
				</div>
				<div class="col-md-8">
					{#each $shoutslist.slice(5, 6) as shout}
						<ShoutCard {shout} />
					{/each}
				</div>
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(6, 9) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[9]} />
				</div>
				<div class="col-md-4">
					<div class="ratings-header">
						<h4>Авторы месяца</h4>
						<a href="/user/list"
							>Ещё авторы
							<Icon name="arrow-right" />
						</a>
					</div>
					{#key $subscribedAuthors}
						{#each topMonthAuthors.slice(0, authorsLimit) as user}
							<UserCard {user} />
						{/each}
					{/key}
				</div>
			</div>
		</div>

		<div class="floor floor--important floor--slider">
			<div class="wide-container row">
				<h2 class="col-12">Выбор сообщества</h2>
				{#if topMonth}
					<Swiper
						modules={[Navigation]}
						spaceBetween={8}
						slidesPerView={1.6666}
						navigation
						centeredSlides
						loop
					>
						{#each shuffle(topMonth) as shout}
							<SwiperSlide>
								<ShoutCard {shout} additionalClass="shout-card--with-cover" />
							</SwiperSlide>
						{/each}
					</Swiper>
				{/if}
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(10, 12) as shout}
					<div class="col-md-6">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--7">
			{#if recents}
				<div class="wide-container row">
					<h2 class="col-12">Коротко</h2>
					{#each recents.slice(12, 16) as shout}
						<div class="col-md-6 col-lg-3">
							<ShoutCard
								{shout}
								additionalClass="shout-card--with-cover shout-card--content-top"
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="floor floor--one-article">
			<div class="wide-container row">
				<div class="col-12">
					<ShoutCard shout={$shoutslist[16]} />
				</div>
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(17, 20) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--important floor--slider">
			<div class="wide-container row">
				{#if topOverall}
					<h2 class="col-12">Избранное</h2>
					<Swiper
						modules={[Navigation]}
						spaceBetween={8}
						slidesPerView={1.6666}
						navigation
						centeredSlides
						loop
					>
						{#each shuffle(topOverall).slice(0, 10) as shout}
							<SwiperSlide>
								<ShoutCard {shout} additionalClass="shout-card--with-cover" />
							</SwiperSlide>
						{/each}
					</Swiper>
				{/if}
			</div>
		</div>

		<div class="floor floor--9">
			<div class="wide-container row">
				<div class="col-md-4">
					<h4>Темы месяца</h4>
					{#if topicsMonth}
						{#each topicsMonth.slice(0, 4) as topic}
							<TopicCard {topic} compact={true} />
						{/each}
					{/if}
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[20]} />
				</div>
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(21, 24) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		{#key shoutsByTopic}
			<div class="floor floor--important floor--topics-group">
				<div class="wide-container row">
					<div class="topics-group__header col-12">
						<div class="row">
							<h3 class="col-sm-6">
								{$topics['research'].title}
							</h3>
							<div class="col-sm-6 all-materials">
								<a href={`/topic/research`}
									>все материалы
									<Icon name="arrow-right-white" />
								</a>
							</div>
						</div>
					</div>
					{#if shoutsByTopic['research']}
						<div class="col-lg-6">
							<ShoutCard shout={shoutsByTopic['research'][0]} />
						</div>
						<div class="col-lg-6">
							<div class="row">
								<div class="col-md-6">
									{#each shoutsByTopic['research'].slice(1, 4) as shout}
										<ShoutCard {shout} noimage={true} />
									{/each}
								</div>
								<div class="col-md-6">
									{#each shoutsByTopic['research'].slice(4, 7) as shout}
										<ShoutCard {shout} noimage={true} />
									{/each}
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>
		{/key}

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[24]} />
				</div>
				<div class="col-md-8">
					<ShoutCard
						shout={$shoutslist[25]}
						additionalClass="shout-card--with-cover"
					/>
				</div>
			</div>
		</div>

		{#key shoutsByTopic}
			<div class="floor">
				<div class="wide-container row">
					{#if shoutsByTopic['psychology']}
						<div class="col-md-4">
							<h4>
								{$topics['psychology'].title}
							</h4>
							{#each shoutsByTopic['psychology'].slice(0, 3) as shout}
								<ShoutCard {shout} nosubtitle={true} noimage={true} isGroup={true} />
							{/each}
						</div>
						{#each shoutsByTopic['psychology'].slice(3, 5) as shout}
							<div class="col-md-4">
								<ShoutCard {shout} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/key}

		<DiscoursBanner />

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(26, 29) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		{#key shoutsByLayout}
			<div class="floor floor--topics-group">
				<div class="wide-container row">
					<div class="topics-group__header col-12">
						<div class="row">
							<h3 class="col-sm-6">Музыка</h3>
							<div class="col-sm-6 all-materials">
								<a href={`/search?layout=music`}
									>все материалы
									<Icon name="arrow-right" />
								</a>
							</div>
						</div>
					</div>
					{#if shoutsByLayout}
						{#each Array.from(shoutsByLayout['music']).slice(0, 3) as shout}
							<div class="col-md-4">
								<ShoutCard {shout} />
							</div>
						{/each}
					{/if}
				</div>
			</div>
		{/key}

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-4">
					{#each $shoutslist.slice(29, 33) as article}
						<ShoutCard shout={article} noimage={true} />
					{/each}
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[34]} photoBottom={true} />
				</div>
			</div>
		</div>

		<ShoutFeed start={35} />
	</div>
{/if}

<style lang="scss">
	.about-discours {
		background: #000;
		color: #fff;
		@include font-size(1.7rem);
		font-weight: 400;
		padding: 3.6rem 0;
		margin-bottom: 6.4rem;

		@include media-breakpoint-up(md) {
			padding: 6.2em 0;
		}

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
			display: inline-block;
			font-weight: bold;
			margin-right: 0.3em;
			margin-bottom: 0.8em;
		}
	}

	.top-viewed {
		counter-reset: item;
		list-style-type: none;
		padding-left: 0;

		li {
			border-bottom: 1px solid #e1e1e1;
			display: flex;
			margin-bottom: 1.6rem;
			padding-bottom: 1.6rem;

			&:last-child {
				border: none;
			}

			&:before {
				content: counter(item, upper-roman);
				counter-increment: item;
				font-size: 1.4em;
				font-weight: 900;
				line-height: 1;
				padding-right: 0.3em;
				min-width: 2em;
				text-align: center;
				width: 2em;
			}
		}
	}

	.top-viewed__topic {
		font-size: 1.2rem;
		letter-spacing: 0.08em;
		margin-bottom: 0.4rem;
		text-transform: uppercase;
	}

	.top-viewed__shout {
		font-size: 1.4rem;

		h4 {
			display: inline;
			font-size: 1.4rem;
		}
	}

	.ratings-header {
		align-items: baseline;
		justify-content: space-between;
		display: flex;
		line-height: 1.1;

		:global(.icon) {
			display: inline-block;
			height: 1em;
			vertical-align: middle;
			width: 1em;
		}

		a {
			@include font-size(1.5rem);
			white-space: nowrap;
		}

		h4 {
			padding-right: 1em;
		}
	}

	:global(.swiper-button-prev),
	:global(.swiper-button-next) {
		height: 100%;
		transform: translate(0);
		top: 0;
		width: 21%;

		&:after {
			color: #fff;
		}
	}

	:global(.swiper-button-prev) {
		background: linear-gradient(
			to left,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.9) 100%
		);
		justify-content: flex-start;
		left: 0;

		&:after {
			margin-left: 5rem;
		}
	}

	:global(.swiper-button-next) {
		background: linear-gradient(
			to left,
			rgba(0, 0, 0, 0.9) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		justify-content: flex-end;
		right: 0;

		&:after {
			margin-right: 5rem;
		}
	}

	.floor--topics-group {
		.all-materials {
			align-self: baseline;
			margin-bottom: 1em;
			white-space: nowrap;

			@include media-breakpoint-up(sm) {
				text-align: right;
			}

			:global(.icon) {
				display: inline-block;
				height: 0.8em;
				vertical-align: middle;
				width: 0.8em;
			}

			:global(img) {
				vertical-align: top;
			}
		}

		.topics-group__header .row {
			align-items: baseline;
		}
	}
</style>
