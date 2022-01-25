<script lang="ts">
  /****
   *
   * usage:
   *
   * <ShoutWall
   *  shouts={shoutsArray}
   *  start={0}
   *  size={5}
   *  on:loadmore={loadMoreHandler}
   */

  import type { Shout } from '$lib/codegen'
  import ShoutCard from './ShoutCard.svelte'
  import { slide } from 'svelte/transition'
  import Masonry from './Masonry.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
  export let shouts: Shout[]
  export let start = 0
  export let size = 9
  let page = 0
  $: end = (page + 1) * size > shouts?.length ? shouts?.length : (page + 1) * size
  $: showed = shouts.slice(start, end)
  $: renderedPage = showed.length / size + (showed.length % size) > 0 ? 1 : 0
  $: if (showed === shouts && renderedPage < page) dispatch('loadmore')

  let offsetHeight: number
  let innerHeight: number
  let scrollY: number

  const onScroll = () => {
    if (
      shouts?.length > 0 &&
      showed.length < shouts?.length &&
      renderedPage < page &&
      innerHeight &&
      scrollY &&
      offsetHeight &&
      innerHeight + scrollY >= offsetHeight
    )
      page += 1
  }
</script>

<svelte:window bind:scrollY bind:innerHeight on:scroll={onScroll} />

<section class="feed">
  <Masonry>
    <div class="card" transition:slide>
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
