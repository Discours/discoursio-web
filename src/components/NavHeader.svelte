<script>
  import Icon from './Icon.svelte'
  import Userpic from './Userpic.svelte'
  import { token, session } from '../stores/auth'
  import { getLocalization } from '../i18n'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  const { t } = getLocalization()

  let res = ''
  let newMessages = 0 // FIXME: get with query

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
</script>

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
      {#if $token}
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

    <div class="right-10 top-10 absolute inline-flex">
      <a href="/inbox" on:click|preventDefault={() => $token ? goto('/inbox') : goto('/login') }>
        <Icon name="bell" counter={$token ? newMessages : 1} />
      </a>
    </div>

    {#if $token}
      <span class="user">
        <a href="/profile">
          <div class:entered={res === '/profile'}>
            <Userpic />
          </div>
        </a>
      </span>
    {/if}
  </nav>
</div>

<style lang="scss">
  .header__inner {
    flex-wrap: wrap;
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
