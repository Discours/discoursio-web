<script lang="ts">
  import { onMount, SvelteComponent } from 'svelte'
  import { fade } from 'svelte/transition'
  
  import type { Shout } from '$lib/codegen'
  
  import { loading, more } from '../stores/app'
  import ShoutBesideFew from './ShoutBesideFew.svelte'
  import Shouts2 from './Shouts2.svelte'
  import Shouts3 from './Shouts3.svelte'
  import ShoutWide from './ShoutWide.svelte'

  export let name = 'recents'
  export let shouts: Shout[]
  export let size = 9
  let showed: Shout[] = []
  $: if (showed === shouts) $more = name // TODO: should trig api request

  const ccc = {
    1: ShoutWide,
    2: Shouts2,
    3: Shouts3,
    4: ShoutBesideFew,
    5: ShoutBesideFew,
    6: ShoutBesideFew
  }
  let rows: Array<{
    limit: number
    component: SvelteComponent
    shouts: Shout[]
  }> = []
  const lim = (num) => (num < shouts?.length ? num : shouts?.length)

  const addRow = (limit, addition) => {
    const component = ccc[limit]
    rows.push({ limit, component, shouts: addition })
    showed = [...showed, ...addition]
  }

  const next = () => {
    const limit = 1 + Math.floor(Math.random() * 6)
    const addition = shouts.slice(showed.length, lim(showed.length + limit))
    showed = [...showed, ...addition]
    addRow(limit, addition)
  }

  onMount(() => (showed = shouts?.slice(0, size)))

  let oh: number // feed offset height
  let ih: number // window inner height
  let sy: number // window scroll y position

  const onScroll = () => {
    const isBottom = ih && sy && oh && ih + sy >= oh
    if(isBottom) {
      if (showed?.length < shouts?.length) next()
      if (showed === shouts) $more = name
    }
  }
</script>

<svelte:window bind:scrollY={sy} bind:innerHeight={ih} on:scroll={onScroll} />

<section class="feed" transition:fade bind:offsetHeight={oh}>
  {#each rows as r}
    <svelte:component this={r.component} limit={r.limit} shouts={r.shouts} />
  {/each}
  {#if showed === shouts}
    <div class="morewrap">
      <div class="show-more">
        <button class="button" type="button" on:click={() => $more = name}>
          {$loading ? 'Загружаем' : 'Загрузить ещё'}
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
