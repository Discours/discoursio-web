<script lang="ts">
  import { SIGN_IN, SIGN_UP } from '../graphql/queries'
  import { graphql } from '../stores/common'
  import AuthFacebook from '../components/AuthFacebook.svelte'
  import AuthVk from '../components/AuthVk.svelte'
  import AuthGoogle from '../components/AuthGoogle.svelte'
  import { auth, GOOGLE_APP_ID } from '../stores/auth'
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'

  export let mode = 'login'
  export let code = ''
  let password2 = ''
  let emailInput

  const login = async () => {
    console.log('auth: signing in with discours.io account')
    let q = await $graphql.request(SIGN_IN, { $email: $auth.email, $password: $auth.password })
    console.debug(q)
  }

  const register = async () => {
    console.log('auth: register with discours.io account ')
    let q = await $graphql.request(SIGN_UP, { $email: $auth.email, $password: $auth.password })
    console.debug(q)
  }

  const forget = async () => {
    console.log('auth: forget password clicked')
    // TODO: forget handler
  }

  const reset = async () => {
    console.log('auth: confirming reset password code')
    console.log(code)
    // TODO: implement me
  }

  const resend = () => {
    console.log('auth: resending auth code')
    // TODO: implement me
  }

  const renew = () => {
    if(password2 === $auth.password) {
      console.log('auth: renewing password')
    }
    // TODO: implement me
  }

  const providerSuccess = (e) => {
    console.dir(e.detail.user)
    // TODO: implement me
  }

  const providerFailure = (e) => {
    console.error(e)
    // TODO: implement me
  }

  

  onMount(() => {
    if(code) {
      reset()
    }
  })
</script>

<svelte:head><title>Дискурс : Авторизация</title></svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->
<div class="row view" class:view--registration={mode === 'register'}>
  <div class="col-sm-6 d-md-none login-image">
    <div class="login-image__text" class:show={mode === 'register'}>
      <h2>Дискурс</h2>
      <h4>Присоединятесь к&nbsp;глобальному сообществу авторов со&nbsp;всего
        мира!</h4>
      <p class="registration-benefits">Познакомитесь с&nbsp;выдающимися людьми
        нашего времени, участвуйте
        в&nbsp;редактировании
        и&nbsp;обсуждении статей, выступайте экспертом, оценивайте материалы
        других авторов со&nbsp;всего мира и&nbsp;определяйте, какие статьи будут
        опубликованы в&nbsp;журнале. Каждый день вас ждут новые истории и&nbsp;ещё
        много всего интересного!</p>
      <p class="disclamer">Регистрируясь, вы&nbsp;даёте согласие
        с&nbsp;<a href={'/rules'}>правилами пользования</a>
        сайтом, на&nbsp;<a href={'/agreement'}>обработку персональных данных</a> и&nbsp;на&nbsp;получение почтовых уведомлений.</p>
    </div>
  </div>
  <form class="col-sm-6 auth">
    <div class="auth__inner">

      <h4>
        {#if mode === 'register'}
          Создать аккаунт
        {:else if mode === 'login'}
          Войти в&nbsp;Дискурс
        {:else if mode === 'forget'}
          Забыли пароль?
        {:else if mode === 'reset'}
          Введите секретный код восстановления пароля
        {:else if mode === 'password'}
          Введите новый пароль
        {/if}
      </h4>

      <div class="auth-subtitle">
        {#if mode === 'forget'}
          Ничего страшного, просто укажите свою почту, чтобы получить ссылку для сброса пароля.
        {:else if mode === 'reset'}
          Введите код из письма или пройдите по ссылке для подтверждения.
        {/if}
      </div>

      {#if mode !== 'reset' && mode !== 'password'}
        <input
          autocomplete="username"
          bind:value={$auth.email}
          bind:this={emailInput}
          type="text"
          placeholder="Ваша почта"
        />
      {/if}

      {#if mode === 'register' || mode === 'login'}
        <input
          autocomplete="current-password"
          bind:value={$auth.password}
          type="password"
          placeholder="Пароль"
        />
        {:else if mode === 'reset'}
        <input
          bind:value={code}
          type="text"
          placeholder="Код восстановления"
        />
        {:else if mode === 'password'}
        <input
          bind:value={$auth.password}
          type="password"
          placeholder="Новый пароль"
        />
        <input
          bind:value={password2}
          type="password"
          placeholder="Подтверждение пароля"
        />
      {/if}
      
      <div>
        <button class="button submitbtn" on:click={
          mode === 'register' && register ||
          mode === 'login' && login ||
          mode === 'forget' && forget ||
          mode === 'reset' && reset ||
          mode === 'password' && renew}>
          {mode === 'register' && 'Создать аккаунт' || 
          mode === 'login' && 'Войти' ||
          mode === 'forget' && 'Восстановить пароль' ||
          mode === 'reset' && ' Подтвердить' || 
          mode === 'password' && 'Создать новый пароль'}
        </button>
      </div>

      {#if mode === 'login'}
        <div class="auth-actions">
          <a href={''} on:click={() => mode = 'forget'}>Забыли пароль?</a>
        </div>
      {/if}

      {#if mode !== 'forget' && mode !== 'reset'}

        <div class="providers-text">
          {#if mode === 'register'}
            Или создайте аккаунт с&nbsp;помощью соцсетей
          {:else if mode === 'login'}
            Или войдите через соцсети
          {/if}
        </div>

        <div class="social-provider">
          <div class="social">
            <AuthFacebook
              on:auth-success={providerSuccess}
              on:auth-failure={providerFailure}
            />
            <AuthGoogle
              clientId={GOOGLE_APP_ID}
              on:auth-success={providerSuccess}
              on:auth-failure={providerFailure}
            />
            <AuthVk
              on:auth-success={providerSuccess}
              on:auth-failure={providerFailure}
            />
          </div>
        </div>

        {/if}

      <div class="registration-control">
        <div class:show={mode === 'register'}>
          <span class="registration-link" on:click={() => (mode = 'login')}
          >У&nbsp;меня есть аккаунт</span>
        </div>
        <div class:show={mode === 'login'}>
          <span class="registration-link" on:click={() => (mode = 'register')}
          >У&nbsp;меня еще нет аккаунта</span>
        </div>
        <div class:show={mode === 'forget'}>
          <span class="registration-link" on:click={() => (mode = 'login')}
          >Я знаю пароль</span>
        </div>
        <div class:show={mode === 'reset'}>
          <span class="registration-link" on:click={resend}
          >Отправить код повторно</span>
        </div>
      </div>

    </div>
  </form>

  <div class="close-control">
    <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg"><path d="M7.99987 7.52552L14.1871 0.92334L15.9548 2.80968L9.76764 9.41185L15.9548 16.014L14.1871 17.9004L7.99987 11.2982L1.81269 17.9004L0.0449219 16.014L6.23211 9.41185L0.0449225 2.80968L1.81269 0.92334L7.99987 7.52552Z" fill="currentColor"/></svg>
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

  .view--registration {
    .login-image {
      order: 2;
    }

    .login-image:before {
      background: linear-gradient(0deg, rgba(20, 20, 20, 0.8), rgba(20, 20, 20, 0.8));
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }

    .close-control {
      color: #fff;
    }
  }

  .login-image {
    background: #141414 url('/auth-page.jpg') center no-repeat;
    background-size: cover;
    color: #fff;
    display: flex;
    @include font-size(1.5rem);
    padding: 3em;
    position: relative;

    @include media-breakpoint-down(sm) {
      display: none;
    }

    :global(h2) {
      text-transform: uppercase;
    }

    :global(h4) {
      font-weight: normal;
    }
  }

  .login-image__text {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;

    a {
      color: #fff;

      &:hover {
        color: rgba(255,255,255,0.7);
      }
    }
  }
  .login-image__text.show {
    display: flex;
  }

  .registration-benefits {
    flex: 1;
  }

  .disclamer {
    color: #9fa1a7;
    @include font-size(1.2rem);
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
    opacity: 1;
    padding: 0;
    position: absolute;
    right: 1em;
    top: 1em;
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
  }

  .registration-control {
    color: $link-color;
    margin-top: 1em;
    text-align: center;
    div {
      display: none;
    }
    .show {
      display: block;
    }
  }

  .registration-link {
    cursor: pointer;
  }

  .providers-text {
    @include font-size(1.5rem);
    margin-top: 1em;
    text-align: center;
  }

  .auth-subtitle {
    @include font-size(1.5rem);
    margin: 1em;
  }
</style>
