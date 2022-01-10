<script lang="ts">
	import { shoutslist } from '../stores/zine'
	import type { Shout } from '$lib/codegen'
	import ShoutCard from './ShoutCard.svelte'
	import { fade } from 'svelte/transition'
	import { onMount } from 'svelte'
	import { shuffle } from '$lib/utils'
	export let props = {}
	export let name: string = 'recents'
	export let shouts: Shout[] = []
	export let start = 0
	export let size = 9
	let page = 1
	let loading = false
	let nomore = false
	$: if ($shoutslist === null && shouts) $shoutslist = shouts
	$: if ($shoutslist) $shoutslist = Array.from(new Set($shoutslist))

	const more = async () => { // what ='topics' | 'authors' 
		loading = true
		console.log('feed: show more shouts')
		if (size * page > $shoutslist.length) {
			const r = await fetch(`/feed/${name}.json?page=${page}&size=${size}` + (name ==='by-topics' ?? `&topics=${props['topics']}`))
			if (r.ok) {
				const { recents: newData } = await r.json()
				if ($shoutslist.includes(newData[0])) {
					console.log('feed: reached the bottom')
					nomore = true
				} else {
					$shoutslist = Array.from(new Set([...newData, ...$shoutslist]))
					console.debug('feed: ' + newData.length.toString() + ' more shouts loaded')
				}
			}
		}
		console.debug('feed: ' + $shoutslist.length.toString() + ' total shouts')
		loading = false
		page += 1
	}
	const lim = (num) => (num < $shoutslist.length ? num : $shoutslist.length)
	let floors = [3, 2, 4] // 1 2 5
	
	onMount(() => {
		floors = shuffle(floors)
		console.debug($shoutslist.slice(0, 9))
	})
</script>

<section class="feed">
	{#each [...Array(page).keys()] as p}
		<div class="page" transition:fade>
			{#each floors as n}
				{#if lim(start + size * (p - 1) + n) < $shoutslist.length}
					<div class={`floor floor--${n}`}>
						<div class="wide-container row">
							{#if n > 3}
								<div class="col-md-4">
									{#each $shoutslist.slice(lim(start + size * (p - 1)), lim(start + size * (p - 1) + n)) as shout}
										<ShoutCard {shout} noimage={true} />
									{/each}
								</div>
								<div class="col-md-8">
									<ShoutCard shout={$shoutslist[lim(start + n + size * (p - 1))]} />
								</div>
							{:else}
								{#each $shoutslist.slice(lim(start + size * (p - 1)), lim(start + size * (p - 1) + n)) as shout}
									<div class={`col-md-${12 / n}`}>
										<ShoutCard {shout} />
									</div>
								{/each}
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	{/each}

	{#if !nomore}
		<div class="morewrap">
			<div class="show-more">
				<button class="button" type="button" on:click={() => more()}>
					{loading ? 'Загружаем' : 'Показать еще'}
				</button>
			</div>
		</div>
	{/if}
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
