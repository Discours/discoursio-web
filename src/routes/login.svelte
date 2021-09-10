<script>
  import { SIGN_IN, SIGN_UP } from '../graphql/queries'
  import { graphql } from '../stores/common'
  import AuthFacebook from '../components/AuthFacebook.svelte'
  import AuthVk from '../components/AuthVk.svelte'
  import { FACEBOOK_APP_ID, VK_APP_ID } from '../stores/auth'
  import { auth } from '../stores/auth'

  let create = false,
    useSocial = false,
    remember = false,
    emailInput

  const login = async () => {
    console.log('auth: signing in with discours.io account')
    let q = await $graphql.request(SIGN_IN, {
      variables: { email: $auth.email, password: $auth.password },
    })
    console.debug(q)
  }

  const register = async () => {
    console.log('auth: register with discours.io account ')
    let q = await $graphql.request(SIGN_UP, {
      variables: { email: $auth.email, password: $auth.password },
    })
    console.debug(q)
  }

  const providerSuccess = (e) => {
    console.dir(e.detail.user)
  }

  const providerFailure = (e) => {
    console.error(e)
  }
</script>

<svelte:head><title>Дискурс : Авторизация</title></svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="row view">
  <div class="col-sm-6 d-md-none login-image" />
  <form class="col-sm-6 auth">
    <div class="auth__inner">
      <div class="tabs">
        <div
          class:active={!create}
          on:click={() => (create ? (create = false) : emailInput.focus())}
        >
          Вход
        </div>
        <div
          class:active={create}
          on:click={() => (create ? emailInput.focus() : (create = true))}
        >
          Регистрация
        </div>
      </div>

      <input
        autocomplete="username"
        bind:value={$auth.email}
        bind:this={emailInput}
        type="text"
        placeholder="Ваша почта"
      />

      <input
        autocomplete="current-password"
        bind:value={$auth.password}
        type="password"
        placeholder="Пароль"
      />

      <div class="auth-actions">
        <div>
          <input id="remember" type="checkbox" bind:checked={remember} />
          <label for="remember">Запомнить меня</label>
        </div>
        <div>
          <a href="/resetpassword">Забыли пароль?</a>
        </div>
      </div>

      <div>
        <button class="button submitbtn" on:click={create ? register : login}>
          {create ? 'Создать аккаунт' : 'Войти'}
        </button>
      </div>

      {#if useSocial}[v]{:else}[&nbsp;]{/if}
      <a href="/login" on:click={() => (useSocial = !useSocial)}>
        <div>
          {'Использовать учётную запись в соцсети'}
        </div>
      </a>
      {#if useSocial}
        <div
          style="width: 100%; height: 330px; margin-top: 16px;"
          class="social-provider"
        >
          <div class="social">
            <AuthVk
              apiId={VK_APP_ID}
              on:auth-success={providerSuccess}
              on:auth-failure={providerFailure}
            />
            <AuthFacebook
              appId={FACEBOOK_APP_ID}
              on:auth-success={providerSuccess}
              on:auth-failure={providerFailure}
            />
          </div>
        </div>
      {/if}
    </div>
  </form>
</div>

<style lang="scss">
  :global(#svelte) {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  :global(main) {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  :global(.subnavigation) {
    margin: 2rem auto !important;
    width: 100%;
  }

  .view {
    flex: 1;
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;

    input {
      @include font-size(1.7rem);
    }
  }

  .login-image {
    background: url('/auth-page.jpg') center no-repeat;
    background-size: cover;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  .tabs {
    display: flex;
    font-weight: 700;
    @include font-size(2.6rem);
    margin-bottom: 1.6rem;

    & > div {
      cursor: pointer;
      color: #696969;

      &:first-child {
        margin-right: 2.4rem;
      }
    }

    .active {
      border-bottom: 2px solid;
      color: #000;
      cursor: default;
    }
  }

  .auth-actions {
    justify-content: space-between;
    margin-bottom: 1.6rem;

    @include media-breakpoint-up(md) {
      display: flex;
    }

    a {
      color: #9fa1a7;
    }

    & > div {
      margin-bottom: 0.8rem;
    }
  }

  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $container-padding-x;

    @include media-breakpoint-up(lg) {
      padding: 3rem 6.8rem;
    }
  }

  .submitbtn {
    color: #9fa1a7;
    display: block;
    font-weight: 700;
    @include font-size(2rem);
    padding: 1.6rem;
    pointer-events: all;
    text-align: center;
    user-select: none;
    width: 100%;
  }

  input[type='text'],
  input[type='password'] {
    border: 2px solid #e8e8e8;
    border-radius: 2px;
    display: block;
    font-family: 'Muller', Arial, Helvetica, sans-serif;
    margin-bottom: 1.6rem;
    padding: 1.5rem 1.2rem;
    width: 100%;
  }

  .social {
    background-color: white !important;
    padding: 1em;
  }
</style>
