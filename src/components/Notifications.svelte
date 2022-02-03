<script lang="ts">
  import { fade } from 'svelte/transition'
  import Portal from 'svelte-portal/src/Portal.svelte'

  import { goto } from '$app/navigation'

  import { showNotices } from '../stores/app'
  import { notices } from '../stores/user'

  let elements: HTMLDivElement[]

  const closeNotification = (ev) => {
    if (
      (ev.target && ev.target.classList.contains('noticewrap')) ||
      ev.target.classList.conatains('close-notice')
    )
      $showNotices = false
  }

  const more = (index: number) => {
    $notices[index].opened = true
    $notices[index].ts = new Date()
  }

  const close = (index: number) => {
    elements[index].setAttribute('style', 'height: 0')
    $notices[index].opened = true
    $notices[index].ts = new Date()
  }

  const follow = (index: number) => {
    goto($notices[index].lead)
    close(index)
  }

  $: if ($notices) console.dir($notices) // debug only
</script>

<Portal target="body">
  {#if $showNotices}
    {#key $notices}
      <div
        class="noticecorner"
        transition:fade
        on:click|preventDefault={closeNotification}
      >
        {#each $notices as notice, index}
          <div
            class={`notice ${notice.type}`}
            class:opened={notice.opened}
            bind:this={elements[index]}
          >
            {notice.text}
            {#if notice.opened}
              <a href={'#'} on:click|preventDefault={() => more(index)}>...</a>
            {:else}
              <a href={'#'} on:click|preventDefault={() => follow(index)}
                >Перейти</a
              >
            {/if}
          </div>
        {/each}
      </div>
    {/key}
  {/if}
</Portal>

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

    .error {
      background-color: pink;
    }
    .info {
      background-color: white;
    }
    .warn {
      background-color: gray;
    }
  }
</style>
