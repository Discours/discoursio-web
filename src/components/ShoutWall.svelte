<script lang="ts">
  /****
   *
   * usage:
   *
   * <ShoutWall
   *  shouts={Shout[]}
   *  size={9}
   */

  import type { Shout } from '$lib/codegen'
  import ShoutCard from './ShoutCard.svelte'
  import { fade, slide } from 'svelte/transition'
  import Masonry from './Masonry.svelte'
  import { more } from '../stores/app'
  import { onMount } from 'svelte'

  export let name = 'recents'
  export let shouts: Shout[]
  export let size = 9
  let showed: Shout[] = []

  const lim = (num) => (num < shouts?.length ? num : shouts?.length)

  const next = () => {
    const limit = 1 + Math.floor(Math.random() * 6)
    const addition = shouts.slice(showed.length, lim(showed.length + limit))
    showed = [...showed, ...addition]
  }

  onMount(() => (showed = shouts?.slice(0, size)))

  let oh: number // feed offset height
  let ih: number // window inner height
  let sy: number // window scroll y position

  const onScroll = () => {
    const isBottom = ih && sy && oh && ih + sy >= oh
    if(isBottom) {
      if (showed.length < shouts?.length) next()
      if (showed === shouts) $more = name
    }
  }
</script>

<svelte:window bind:scrollY={sy} bind:innerHeight={ih} on:scroll={onScroll} />
<section class="feed" transition:fade bind:offsetHeight={oh}>
  <Masonry>
    <div class="card">
      {#each showed as shout}
        <ShoutCard {shout} />
      {/each}
    </div>
  </Masonry>
</section>

<style lang="scss">
  .card {
    display: flex;
  }
</style>
