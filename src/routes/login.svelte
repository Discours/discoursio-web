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
<div class="view">
  <form class="auth">
    <div class="tabs" style="width: 100%; height: 54px; margin-top: 16px;">
      <div
        class="login-tab-title half"
        class:active={!create}
        on:click={() => (create ? (create = false) : emailInput.focus())}
      >
        Вход
      </div>
      <div
        class="register-tab-title half"
        class:active={create}
        on:click={() => (create ? emailInput.focus() : (create = true))}
      >
        Регистрация
      </div>
    </div>

    <div style="width: 100%; height: 33px; margin-top: 16px;">
      <div class="rowflex" style="justify-content: center;">
        <div style="width: 100%;">
          <input
            autocomplete="username"
            class="login-input"
            bind:value={$auth.email}
            bind:this={emailInput}
            type="text"
            placeholder="Ваша почта"
          />
        </div>
      </div>
    </div>

    <div style="width: 100%; height: 33px; margin-top: 16px;">
      <div class="rowflex" style="justify-content: center;">
        <div style="width: 100%;">
          <input
            autocomplete="current-password"
            class="password-input"
            bind:value={$auth.password}
            type="password"
            placeholder="Пароль"
          />
        </div>
      </div>
    </div>

    <div style="width: 100%; margin-top: 16px;">
      <div class="half">
        <input type="checkbox" bind:checked={remember} />
        <span style="line-height: 20px;">Запомнить</span>
      </div>
      <div class="half" style="color: rgba(158.93, 161.32, 167.47, 1);">
        <a href="/resetpassword">Сброс пароля</a>
      </div>
    </div>

    <div style="width: 100%; height: 33px; margin-top: 16px;">
      <div class="submitbtn" on:click={create ? register : login}>
        {create ? 'Создать аккаунт' : 'Войти'}
      </div>
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
  </form>
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 10%;
  }
  .view {
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .tabs {
    font-size: xx-large;
  }
  .rowflex {
    flex: 1 1 0%;
    height: 100%;
  }
  .password-input,
  .login-input {
    flex: 1 1 0%;
    font-size: 17px;
    line-height: 24px;
    border: none;
    outline: none;
    color: var(--danger-color);
  }
  .register-tab-title,
  .login-tab-title {
    height: 40px;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    pointer-events: all;
    color: gray;
  }

  .half {
    width: 50%;
  }

  .active {
    color: black;
  }

  .auth {
    display: inline-flex;
    flex-direction: column;
    min-width: 45%;
  }
  .submitbtn {
    cursor: pointer;
    pointer-events: all;
    padding: 16px;
    display: flex;
    user-select: none;
    font-size: 25px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: rgba(158.93, 161.32, 167.47, 1);
  }
  input[type='text'],
  input[type='password'] {
    border-bottom: 1px solid rgb(162, 162, 162);
  }
  .social {
    background-color: white !important;
    padding: 1em;
  }
</style>
