<script>
  import Icon from './Icon.svelte'
  import Userpic from './Userpic.svelte'
  import { token, session } from '../stores/auth'
  import { getLocalization } from '../i18n'
  import { onMount } from 'svelte'

  const { t } = getLocalization()

  let res = ''
  let newMessages = 0 // FIXME: get with query

  onMount(() => (res = window.location.pathname))

  const MAIN_NAVIGATION = [
    {
      title: 'журнал',
      href: '/',
    },
    {
      title: 'лента',
      href: '/feed',
    },
    {
      title: 'сообщество',
      href: '/community',
    },
    {
      title: 'форум',
      href: '/forum',
    },
  ]
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="wide-container">
  <nav class="row header__inner">
    <div class="main-logo col"><a href="/">Дискурc</a></div>
    <ul class="col main-navigation">
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
    </ul>
    <div class="router col-sm-4">
      <!-- public routes -->
      <div class="routerow">
        <div class="routecell">
          <a href="/search">
            <Icon
              name={res === '/search' ? 'searching' : 'search'}
              title={$t('Search')}
            />
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          {#if $token}
            <a href="/inbox">
              <Icon name="bell" counter={newMessages}/>
            </a>
          {:else}
            <a href="/login"> Войти </a>
          {/if}
        </div>
      </div>

      {#if $token}
        <!-- private routes -->
        <div class="routerow">
          <div class="routecell">
            <a href="/profile">
              <div class:entered={res === '/profile'}>
                <Userpic/>
              </div>
            </a>
          </div>
        </div>

        <div class="routerow">
          <div class="routecell">
            <a href="/editor">
              <Icon
                name={res === '/editor' ? 'editing' : 'editor'}
                title="editor"
              />
            </a>
          </div>
        </div>

        <div class="routerow">
          <div class="routecell">
            <a href="/community">
              <Icon
                name={res === '/comunity' ? 'community-entered' : 'commmunity'}
                title="community"
              />
            </a>
          </div>
        </div>
      {/if}
    </div>
  </nav>
</div>

<style lang="scss">
  .header__inner {
    flex-wrap: wrap;
  }

  .main-logo {
    align-items: center;
    display: flex;
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

    .router {
      //height: 28px;
      display: flex;
      //flex-direction: row;
      //align-items: flex-end;
      justify-content: flex-end;
      //width: 100%;

      .routerow {
        display: inline-flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        padding-top: 2px;

        .routecell {
          display: flex;
          flex-direction: column;
          align-items: center;

          a {
            font-size: 15px;
            font-weight: 500;
            line-height: 22px;
            color: white;
          }
        }
      }
    }
  }

  .main-navigation {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    @include font-size(1.7rem);

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
