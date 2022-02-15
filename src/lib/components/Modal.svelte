<script lang="ts">
  import { fade } from 'svelte/transition'

  import { openModal } from '$lib/stores/app'
  export let name: string // auth || feedback || subscribe

  const wrapClick = (ev) => {
    if (ev.target.classList.contains('modalwrap')) $openModal = ''
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') $openModal = ''
  }}
/>
{#if $openModal === name}
  <div class="modalwrap" transition:fade on:click|preventDefault={wrapClick}>
    <div class="modalwrap__inner">
      <slot />
      <div
        class="close-control"
        on:click|preventDefault={() => ($openModal = '')}
      >
        <svg
          width="16"
          height="18"
          viewBox="0 0 16 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.99987 7.52552L14.1871 0.92334L15.9548 2.80968L9.76764 9.41185L15.9548 16.014L14.1871 17.9004L7.99987 11.2982L1.81269 17.9004L0.0449219 16.014L6.23211 9.41185L0.0449225 2.80968L1.81269 0.92334L7.99987 7.52552Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .modalwrap {
    pointer-events: all;
    align-items: center;
    background: rgba(20, 20, 20, 0.7);
    display: flex;
    justify-content: center;
    height: 100%;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;

    .close-control {
      position: absolute;
      top: 1em;
      cursor: pointer;
      height: 0.8em;
      opacity: 1;
      padding: 0;
      right: 0;
      transition: opacity 0.3s;
      width: 0.8em;
      z-index: 1;

      svg {
        pointer-events: none;
      }

      &:hover {
        opacity: 0.5;
      }

      :global(.icon) {
        height: 100%;
        width: 100%;
      }

      @media (min-width: 800px) and (max-width: 991px) {
        top: 11em;
      }
    }
  }

  .modalwrap__inner {
    background: #fff;
    max-width: 1000px;
    position: relative;
    width: 80%;
  }

  :global(.modalwrap__content) {
    padding: $container-padding-x;

    @include media-breakpoint-up(lg) {
      padding: 10rem 6rem;
    }
  }
</style>
