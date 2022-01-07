<script lang="ts">
	import {shoutslist} from "../stores/zine"
	import type {Shout} from '$lib/codegen'
	import ShoutCard from './ShoutCard.svelte'
	import {fade} from "svelte/transition"

	export let shouts: Shout[] = []
	export let start = 0
	export let size = 9
	let page = 1
	let loading = false

	$: if ($shoutslist === null && shouts) $shoutslist = shouts

	const moreShouts = async () => {
		loading = true
		console.log('feed: show more shouts')
		const r = await fetch('/feed/recents.json?page=' + page + '&size=' + size)
		if (r.ok) {
			const {recents: newData} = await r.json()
			console.debug('feed: ' + newData.length.toString() + ' more shouts loaded')
			$shoutslist = Array.from(new Set([...newData, ...$shoutslist]))
			loading = false
			page += 1
		}
	}

	const lim = (num) => num < $shoutslist.length ? num : $shoutslist.length
</script>

<section class="feed">

	{#each [...Array(page).keys()] as p}
		<div class="page" transition:fade>
			<div class="floor">
				<div class="wide-container row">
					{#each $shoutslist.slice(lim(start + size * p + 3), lim(start + size * p + 5)) as shout}
						<div class="col-md-6">
							<ShoutCard {shout}/>
						</div>
					{/each}
				</div>
			</div>

			<div class="floor">
				<div class="wide-container row">
					{#each $shoutslist.slice(lim(start + size * p), lim(start + size * p + 3)) as shout}
						<div class="col-md-4">
							<ShoutCard {shout}/>
						</div>
					{/each}
				</div>
			</div>

			<div class="floor">
				<div class="wide-container row">
					<div class="col-md-4">
						{#each $shoutslist.slice(lim(start + size * p + 5), lim(start + size * p + 9)) as shout}
							<ShoutCard noimage={true} {shout}/>
						{/each}
					</div>
					<div class="col-md-8">
						<ShoutCard shout={$shoutslist[lim(start + size*p + 9)-1]}/>
					</div>
				</div>
			</div>
		</div>
	{/each}

	<div class="morewrap">
		<div class="show-more">
			<button class="button" type="button" on:click={moreShouts}
			>{loading ? 'Загружаем' : 'Показать еще'}</button
			>
		</div>
	</div>

</section>

<style lang="scss">
	.morewrap {
		flex: 1 58.3333%;
	}

	.show-more {
		margin-bottom: 6.4rem;
		text-align: center;
	}

</style>
