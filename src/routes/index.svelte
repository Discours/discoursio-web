<script context="module">
	import 'swiper/css'
	import 'swiper/css/navigation'
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
	// import CommunityCard from '../components/CommunityCard.svelte'
	import Icon from '../components/DiscoursIcon.svelte'
	import { Navigation } from 'swiper'
	import { Swiper, SwiperSlide } from 'swiper/svelte'
	import { shouts, topics, shoutslist, subscribedAuthors } from '../stores/zine'
	import DiscoursBanner from '../components/DiscoursBanner.svelte'
	import NavTopics from '../components/NavTopics.svelte'
	import { fade } from 'svelte/transition'
	import { loading } from '../stores/app'
	import ShoutFeed from '../components/ShoutFeed.svelte'

	export let recents = []
	export let topMonth = []
	export let topOverall = []
	export let topViewed = []
	let topCommented = [],
		authorsMonth = [],
		topicsMonth = [],
		topicsGroup = []
	const authorsLimit = 8
	let tslugs: Set<string> = new Set([])
	let aslugs: Set<string> = new Set([])
	let favs = [],
		favs1 = []

	$: if ($shoutslist === null) {
		$loading = true
		console.log(
			`mainpage: loaded ${recents.length.toString()} recent shouts from api`
		)
		// fill up shouts dict store
		recents.forEach((s) => ($shouts[s.slug] = s))
		$shoutslist = recents.sort(
			(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		)
		console.log(
			`mainpage: loaded ${topMonth.length.toString()} top month shouts from api`
		)
		// top commented
		topCommented = recents
			.filter((s) => s.stat.comments > 0)
			.sort((a, b) => b.stat.comments - a.stat.comments)
		console.log(`mainpage: found ${topCommented.length.toString()} commented`)
		// prepare top month authors and topics
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
			$shouts[s.slug] = s
		})
		// top month topics sorted by authors amount
		topicsMonth = topicsMonth.sort(
			(a, b) => b.topicStat.authors - a.topicStat.authors
		)
		// top month authors
		authorsMonth = authorsMonth.sort((a, b) => b.rating - a.rating)
		console.log(`mainpage: found ${authorsMonth.length.toString()} authors`)
		// one topic filtered
		topicsGroup = $shoutslist.filter((t) =>
			t.topics.find((topic) => topic.slug === 'culture')
		)
		topOverall.forEach((s) => ($shouts[s.slug] = s))
		if (topOverall && topOverall.length > 9) {
			favs = topOverall.slice(0, 10)
			favs1 = topOverall.slice(10, 20)
			// favs2 = topOverall.slice(20, 30)
		}
		$loading = false
	}

	// NOTICE: onMount(() => $shoutslist = null) should be triggered by __layout.svelte

</script>

<svelte:head><title>Дискурс : Главная</title></svelte:head>
{#if $shoutslist && $shoutslist.length > 0}
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
						<a class="button" href="/auth">присоединитьсяк&nbsp;сообществу</a>
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
						{#each topViewed.slice(0, 5) as shout}
							<li>
								<div>
									<div class="top-viewed__topic">
										<a
											href="/topic/{shout.topics.find(
												(item) => item.slug === shout.mainTopic
											).slug}"
										>
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
				{#each $shoutslist.slice(7, 10) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[14]} />
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
						{#each authorsMonth.slice(0, authorsLimit) as user}
							<UserCard {user} />
						{/each}
					{/key}
				</div>
			</div>
		</div>

		<div class="floor floor--important floor--slider">
			<div class="wide-container row">
				<h2 class="col-12">Выбор сообщества</h2>
				{#if favs && favs.length > 0}
					<Swiper
						modules={[Navigation]}
						spaceBetween={8}
						slidesPerView={1.6666}
						navigation
						centeredSlides
						loop
					>
						{#each favs as shout}
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
					{#each recents.slice(0, 4) as shout}
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
					<ShoutCard shout={$shoutslist[13]} />
				</div>
			</div>
		</div>

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(15, 18) as shout}
					<div class="col-md-4">
						<ShoutCard {shout} />
					</div>
				{/each}
			</div>
		</div>

		<div class="floor floor--important floor--slider">
			<div class="wide-container row">
				{#if favs1 && favs1.length > 0}
					<h2 class="col-12">Избранное</h2>
					<Swiper
						modules={[Navigation]}
						spaceBetween={8}
						slidesPerView={1.6666}
						navigation
						centeredSlides
						loop
					>
						{#each favs1 as shout}
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

		{#if topicsGroup && topicsGroup.length > 0}
			<div class="floor floor--important floor--topics-group">
				<div class="wide-container row">
					<div class="topics-group__header col-12">
						<div class="row">
							<h3 class="col-sm-6">
								{topicsGroup[0].topics.find(
									(item) => item.slug === topicsGroup[0].mainTopic
								).title}
							</h3>
							<div class="col-sm-6 all-materials">
								<a href={`/topic/${topicsGroup[0].mainTopic}`}
									>все материалы
									<Icon name="arrow-right-white" />
								</a>
							</div>
						</div>
					</div>
					<div class="col-lg-6">
						<ShoutCard shout={topicsGroup[0]} />
					</div>
					<div class="col-lg-6">
						<div class="row">
							<div class="col-md-6">
								{#each topicsGroup.slice(1, 4) as article}
									<ShoutCard shout={article} />
								{/each}
							</div>
							<div class="col-md-6">
								{#each topicsGroup.slice(4, 7) as article}
									<ShoutCard shout={article} />
								{/each}
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-4">
					<ShoutCard shout={$shoutslist[22]} />
				</div>
				<div class="col-md-8">
					<ShoutCard
						shout={$shoutslist[23]}
						additionalClass="shout-card--with-cover"
					/>
				</div>
			</div>
		</div>

		{#if topicsGroup && topicsGroup.length > 0}
			<div class="floor">
				<div class="wide-container row">
					<div class="col-md-4">
						<h4>
							{topicsGroup[0].topics.find(
								(item) => item.slug === topicsGroup[0].mainTopic
							).title}
						</h4>
						{#each topicsGroup.slice(4, 7) as article}
							<ShoutCard shout={article} nosubtitle={true} noimage={true} isGroup={true} />
						{/each}
					</div>
					{#each $shoutslist.slice(24, 26) as article}
						<div class="col-md-4">
							<ShoutCard shout={article} />
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="floor floor--14">
			<div class="wide-container row">
				<h4>Культура</h4>
				{#each $shoutslist
					.filter((s) => {
						if (s.topics) s.topics.map((t) => t.slug).includes('culture')
						else console.error(s)
					})
					.slice(0, 3) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		<DiscoursBanner />

		<div class="floor">
			<div class="wide-container row">
				{#each $shoutslist.slice(0, 3) as article}
					<div class="col-md-4">
						<ShoutCard shout={article} />
					</div>
				{/each}
			</div>
		</div>

		{#if topicsGroup.length > 0}
			<div class="floor floor--topics-group">
				<div class="wide-container row">
					<div class="topics-group__header col-12">
						<div class="row">
							<h3 class="col-sm-6">
								{topicsGroup[0].topics.find(
									(item) => item.slug === topicsGroup[0].mainTopic
								).title}
							</h3>
							<div class="col-sm-6 all-materials">
								<a href={`/topic/${topicsGroup[0].mainTopic}`}
									>все материалы
									<Icon name="arrow-right" />
								</a>
							</div>
						</div>
					</div>
					{#each topicsGroup.slice(0, 3) as article}
						<div class="col-md-4">
							<ShoutCard shout={article} />
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<div class="floor">
			<div class="wide-container row">
				<div class="col-md-4">
					{#each $shoutslist.slice(4, 8) as article}
						<ShoutCard shout={article} noimage={true} />
					{/each}
				</div>
				<div class="col-md-8">
					<ShoutCard shout={$shoutslist[8]} photoBottom={true} />
				</div>
			</div>
		</div>
		<ShoutFeed start={27} />
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
