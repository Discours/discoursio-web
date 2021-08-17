<script>
  import { links } from 'svelte-navigator'

  import Icon from './Icon.svelte'
  import Userpic from './Userpic.svelte'

  import { token } from '../stores/auth'

  import { getLocalization } from '../i18n'
  const { t } = getLocalization()

  let newMessages = 0 // FIXME: get with query

  const here = (where) => window && window.location === where
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<nav use:links>
  <a href="/"><h1>Дискурc</h1></a>
  <div style="width: 195px;" />
  <div class="router">
    <!-- public routes -->
    <div class="routerow">
      <div class="routecell">
        <a href="/search">
          <Icon
            name={here('/search') ? 'searching' : 'search'}
            title={$t('Search')}
          />
        </a>
      </div>
    </div>

    <div class="routerow">
      <div class="routecell">
        {#if $token}
        <a href="/inbox">
          <Icon name="bell" counter={newMessages} />
        </a>
        {:else}
        <a href="/login">
          Войти
        </a>
        {/if}
      </div>
    </div>

    {#if $token}
      <!-- private routes -->
      <div class="routerow">
        <div class="routecell">
          <a href="/profile">
            <div class:entered={here('/profile')}>
              <Userpic />
            </div>
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          <a href="/editor">
            <Icon
              name={here('/editor') ? 'editing' : 'editor'}
              title="editor"
            />
          </a>
        </div>
      </div>

      <div class="routerow">
        <div class="routecell">
          <a href="/community">
            <Icon
              name={here('/comunity') ? 'community-entered' : 'commmunity'}
              title="community"
            />
          </a>
        </div>
      </div>
    {/if}
  </div>
</nav>

<style lang="scss">
  nav {
    width: 100%;
    height: 80px;
    background-color: rgba(20.4, 20.4, 20.4, 1);
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    h1 {
      width: 180px;
      height: 80px;
      padding: 8px 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      font-weight: 700;
      line-height: 44px;
      text-align: center;
      color: white;
      text-transform: uppercase;
    }

    .router {
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      justify-content: flex-end;
      width: 100%;

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
</style>
