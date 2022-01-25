<script lang="ts">
  import { showNotices } from '../stores/app'
  import { notices } from '../stores/user'
  import { fade } from 'svelte/transition'
  import { goto } from '$app/navigation'

  let elements: HTMLDivElement[]

  const closeNotification = (ev) => {
    if (
      (ev.target && ev.target.classList.contains('noticewrap')) ||
      ev.target.classList.conatains('close-notice')
    )
      $showNotices = false
  }
  const more = (index) => {
    $notices[index].state = 'opened'
    $notices[index].ts = new Date()
  }
  const close = (index) => {
    elements[index].setAttribute('style', 'height: 0')
    $notices[index].state = 'closed'
    $notices[index].ts = new Date()
  }
  const follow = (index) => {
    goto($notices[index].lead)
    close(index)
  }
</script>

{#if $showNotices}
  <div
    class="noticecorner"
    transition:fade
    on:click|preventDefault={closeNotification}
  >
    {#each $notices as notice, index}
      <div
        class={`notice ${notice.type} ${notice.state}`}
        bind:this={elements[index]}
      >
        {notice.text}
        {#if notice.state === 'shown'}
          <a href={'#'} on:click|preventDefault={() => more(index)}>...</a>
        {/if}
        {#if notice.state === 'open'}
          <a href={'#'} on:click|preventDefault={() => follow(index)}>Перейти</a
          >
        {/if}
      </div>
    {/each}
  </div>
{/if}

<style lang="scss">
  .noticecorner {
    top: 0;
    right: 0;
    display: fixed;
    min-width: 100px;
    max-width: 50%;
  }
  .notice {
    width: auto;
    transition: all ease 1s;

    &.opened {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    &.opened {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    a {
      color: #000;

      &:hover {
        color: #000;
      }
    }
  }
</style>
