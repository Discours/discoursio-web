<script lang="ts">
  import type { Shout } from '$lib/codegen'
  import ShoutCard from './ShoutCard.svelte'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { shuffle } from '$lib/utils'
  // import { createEventDispatcher } from 'svelte'
  import { loading, more } from '../stores/app'

  // const dispatch = createEventDispatcher()

  export let props = {}
  export let name = 'recents'
  export let shouts: Shout[]
  export let start = 0
  export let size = 9
  let page = 0
  let showed: Shout[] = []
  $: end = (page + 1) * size > shouts?.length ? shouts?.length : (page + 1) * size
  $: if(shouts?.length > 0) showed = shouts.slice(start, end)
  $: renderedPage = showed.length / size + (showed.length % size) > 0 ? 1 : 0
  $: if (showed === shouts && renderedPage < page) $more = name
  let nomore = false

  const lim = (num) => (num < shouts?.length ? num : shouts?.length)
  let perFloor = [3, 2, 4] // 1 2 5

  onMount(() => {
    perFloor = shuffle(perFloor)
    // console.debug(shouts.slice(start, size))
  })

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
  {#each [...Array(page).keys()] as p}
    <div class="page" transition:fade>
      {#each perFloor as per, floor}
        {@const begin = start + page * size}
        {@const end = lim(begin + per)}
        {#if begin < shouts?.length}
          <div class={`floor floor--${floor}`}>
            <div class="wide-container row">
              {#if per > 3}
                <div class="col-md-4">
                  {#each showed.slice(begin, begin + per) as shout}
                    <ShoutCard {shout} noimage={true} />
                  {/each}
                </div>
                <div class="col-md-8">
                  <ShoutCard shout={shouts[end]} />
                </div>
              {:else}
                {#each shouts.slice(begin, end) as shout}
                  <div class={`col-md-${12 / per}`}>
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
        <button class="button" type="button" on:click={() => ($more = name)}>
          {$loading ? 'Загружаем' : 'Показать еще'}
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
