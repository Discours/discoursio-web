<script lang="ts">
  import { SIGN_IN, SIGN_UP } from '../graphql/queries'
  import { graphql } from '../stores/common'
  import AuthFacebook from '../components/AuthFacebook.svelte'
  import AuthVk from '../components/AuthVk.svelte'
  import { auth } from '../stores/auth'
  import Icon from './Icon.svelte'

  let create = false,
    useSocial = false,
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
      <h4>
        {#if create}
          Создать аккаунт
        {:else}
          Войти в&nbsp;Дискурс
        {/if}
      </h4>

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

      <div>
        <button class="button submitbtn" on:click={create ? register : login}>
          {create ? 'Создать аккаунт' : 'Войти'}
        </button>
      </div>

      {#if !create}
        <div class="auth-actions">
          <a href="/resetpassword">Забыли пароль?</a>
        </div>
      {/if}

      <div class="social-nets-label">
        {#if create}
          Или создайте аккаунт с&nbsp;помощью соцсетей
        {:else}
          Или войдите через соцсети
        {/if}
      </div>

      <div class="social-provider">
        <div class="social">
          <AuthFacebook
            on:auth-success={providerSuccess}
            on:auth-failure={providerFailure}
          />
          <AuthVk
            on:auth-success={providerSuccess}
            on:auth-failure={providerFailure}
          />
        </div>
      </div>

      <div class="registration-control">
        <div class:hidden={!create}>
          <span class="registration-link" on:click={() => (create = false)}
          >У&nbsp;меня есть аккаунт</span>
        </div>
        <div class:hidden={create}>
          <span class="registration-link" on:click={() => (create = true)}
          >У&nbsp;меня еще нет аккаунта</span>
        </div>
      </div>
    </div>
  </form>

  <div class="close-control">
    <Icon name="close" />
  </div>
</div>

<style lang="scss">
  .view {
    background: #fff;
    max-width: 1000px;
    position: relative;
    width: 80%;

    input {
      font-size: 1.7rem;
    }

    :global(h4) {
      margin-bottom: 0.6em;
    }
  }

  .login-image {
    background: #141414 url('/auth-page.jpg') center no-repeat;
    background-size: cover;

    @include media-breakpoint-down(sm) {
      display: none;
    }
  }

  .auth-actions {
    border-bottom: 1px solid #e8e8e8;
    @include font-size(1.5rem);
    margin-top: 1.6rem;
    padding-bottom: 1em;
    text-align: center;

    a {
      color: #9fa1a7;
    }
  }

  .auth {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: $container-padding-x;

    @include media-breakpoint-up(lg) {
      padding: 10rem 6rem;
    }
  }

  .submitbtn {
    display: block;
    font-weight: 700;
    padding: 1.6rem;
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
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    margin: 0 -5px;
    padding: 1em 0;

    > :global(*) {
      background: #f7f7f7;
      cursor: pointer;
      flex: 1;
      margin: 0 5px;
      padding: 0.5em;
      text-align: center;
    }

    :global(img) {
      height: 1.4em;
      max-width: 1.8em;
      vertical-align: middle;
      width: auto;
    }
  }

  .close-control {
    cursor: pointer;
    height: 0.8em;
    padding: 0;
    position: absolute;
    right: 1em;
    top: 1em;
    width: 0.8em;
    z-index: 1;

    .icon {
      height: 100%;
      width: 100%;
    }
  }

  .registration-control {
    color: $link-color;
    margin-top: 1em;
    text-align: center;
  }

  .registration-link {
    cursor: pointer;
  }

  .social-nets-label {
    @include font-size(1.5rem);
    margin-top: 1em;
    text-align: center;
  }
</style>
