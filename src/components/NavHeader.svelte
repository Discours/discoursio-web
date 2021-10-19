<script>
  import Icon from './Icon.svelte'
  import Userpic from './Userpic.svelte'
  import Auth from './Auth.svelte'
  import { token, session } from '../stores/auth'
  import { getLocalization } from '../i18n'
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'

  const { t } = getLocalization()

  let res = ''
  let newMessages = 0 // FIXME: get with query
  let showingAuth = false

  onMount(() => (res = window.location.pathname))

  const MAIN_NAVIGATION = [
    {
      title: 'журнал', // популярное/рекомендованное
      href: '/',
    },
    {
      title: 'лента', // актуальное
      href: '/feed',
    },
    {
      title: 'создать публикацию',
      href: '/create',
    },
  ]
  const toggleLogin = () => {
    showingAuth = !showingAuth
  }

  const showNotifications = () => {
    console.log('nav: showing notifications')
  }

  const closeModal = (ev) => {
    if (
      (ev.target && ev.target.classList.contains('modalwrap')) ||
      ev.target.classList.contains('close-control')
    )
      showingAuth = false
  }
</script>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape') showingAuth = false
  }}
/>
<!-- svelte-ignore a11y-missing-attribute -->
<div class="wide-container">
  <nav class="row header__inner">
    <div class="main-logo col-auto"><a href="/">Дискурc</a></div>

    <ul class="col main-navigation text-2xl">
      {#each MAIN_NAVIGATION as navItem, index}
        <li class:selected={res === navItem.href}>
          {#if res === navItem.href}
            {navItem.title}
          {:else}
            <a href={navItem.href} on:click={() => (res = navItem.href)}
              >{navItem.title}</a
            >
          {/if}
        </li>
      {/each}
      {#if !!$token}
        <li class:selected={res === '/community'}>
          {#if res === '/community'}
            {'сообщество'}
          {:else}
            <a href={'/community'} on:click={() => (res = '/community')}>
              {'сообщество'}
            </a>
          {/if}
        </li>
      {/if}
    </ul>

    <div class="notice inline-flex">
      <a
        href={''}
        on:click|preventDefault={() =>
          $token ? showNotifications() : toggleLogin()}
      >
        <Icon name="bell" counter={$token ? newMessages : 1} />
      </a>
    </div>

    {#if $session}
      <span class="user">
        <a href="/profile">
          <div class:entered={res === '/profile'}>
            <Userpic {$session} />
          </div>
        </a>
      </span>
    {/if}
  </nav>

  {#if showingAuth}
    <div class="modalwrap" transition:fade on:click|preventDefault={closeModal}>
      <Auth />
    </div>
  {/if}
</div>

<style lang="scss">
  .header__inner {
    flex-wrap: wrap;
  }

  .notice {
    width: auto;
  }

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
  }

  .main-logo {
    align-items: center;
    display: inline-flex;
    flex-direction: row;
    flex: 0;
    font-size: 36px;
    font-weight: 700;
    height: 80px;
    padding-right: 3.2rem;
    text-align: center;
    text-transform: uppercase;

    a {
      color: white;
    }
  }

  nav {
    align-items: center;
  }

  .main-navigation {
    display: inline-flex;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin-right: 2.4rem;

      &:last-child {
        margin-right: 0;
      }
    }

    a {
      color: rgba(255, 255, 255, 0.64);

      &:hover {
        color: #fff;
      }
    }

    .selected {
      border-bottom: 2px solid;
      color: #fff;
    }
  }
</style>
