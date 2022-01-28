<script lang="ts">
  import { page } from '$app/stores'
  import Icon from './DiscoursIcon.svelte'
  import { notices, session, token as tokenStore } from '../stores/user'
  import { openModal } from '../stores/app'
  import { fade } from 'svelte/transition'
  import { API_ENDPOINT } from '$lib/client'

  export let mode = 'sign-in'
  export let code = ''
  export let warnings: string[] = []
  export let notifications: string[] = []

  let email
  let password
  let password2 = ''
  let nto
  let process = false

  const authSuccess = (data) => {
    console.dir(data)
    const { token, user } = data
    $tokenStore = token
    $session = user
    $openModal = ''
    process = false
    $notices.push({
      type: 'info',
      text: 'Welcome!',
      state: 'new',
      ts: new Date()
    })
  }

  const showMessage = (text, collection=null) => {
    if(collection===null) collection = notifications
    if(collection[collection.length-1] !== text) collection.push(text)
    clearTimeout(nto)
    nto = setTimeout(() => {
      console.dir()
      collection = collection.filter((w) => w !== text)
    }, 3400)
  }
  
  const showError = (error) => showMessage(error, warnings)
  const authFailure = (data) => {
    const { error } = data
    process = false
    showError(error)
  }

  const _auth = (endpoint: string) => {
    showMessage('Пожалуйста, подождите..')
    fetch(`/auth/${endpoint}`, {
      method: 'POST',
      cache: 'no-cache', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, code })
    })
      .then(r => r.ok? r.json().then(authSuccess) : authFailure({ error: 'Неизвестная ошибка, попробуйте ещё раз' }))
      .catch((error) => authFailure({ error }))
  }
      
  const auth = (endpoint: string) => {
    const emailTyped = email?.length > 5 && email.includes('@') && email.includes('.')
    if(!emailTyped) authFailure('Пожалуйста, проверьте введенный адрес почты')
    process = true
    if (mode === 'sign-up') {
      showMessage('Ищем учётную запись с таким почтовым адресом')
      fetch(`/auth/sign-check?email=${email}`).then((r) => {
        if (r.ok) _auth(endpoint)
        else authFailure({ error: 'Такой адрес почты уже зарегистрирован, попробуйте залогиниться' })
      }) 
    } else {
      _auth(endpoint) 
    }
  }

  // if code in url params
  $: if (code = $page?.url?.searchParams.get('code')) auth('reset')

  const oauth = (provider: string) => {
    // $openModal = false
    window.open(
      API_ENDPOINT + `/oauth/${provider}`,
      provider,
      'width=740, height=420'
    )
  }

  const titles = {
    'sign-up': 'Создать аккаунт',
    'sign-in': 'Войти в Дискурс',
    'forget': 'Забыли пароль?',
    'reset': 'Подтвердите почту и действие совершится',
    'resend': 'Выслать подтверждение',
    'password': 'Введите новый пароль'
  }
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div
  class="row view"
  class:view--sign-up={mode === 'sign-up'}
  transition:fade
>
  <div class="col-sm-6 d-md-none auth-image">
    <div class="auth-image__text" class:show={mode === 'sign-up'}>
      <h2>Дискурс</h2>
      <h4>
        Присоединятесь к&nbsp;глобальному сообществу авторов со&nbsp;всего мира!
      </h4>
      <p class="auth-benefits">
        Познакомитесь с&nbsp;выдающимися людьми нашего времени, участвуйте
        в&nbsp;редактировании и&nbsp;обсуждении статей, выступайте экспертом,
        оценивайте материалы других авторов со&nbsp;всего мира
        и&nbsp;определяйте, какие статьи будут опубликованы в&nbsp;журнале.
        Каждый день вас ждут новые истории и&nbsp;ещё много всего интересного!
      </p>
      <p class="disclamer">
        Регистрируясь, вы&nbsp;даёте согласие с&nbsp;<a
          href="/about/terms-of-use"
          on:click={() => $openModal = ''}>правилами пользования</a>
        сайтом, на&nbsp;обработку персональных данных и&nbsp;на&nbsp;получение почтовых
        уведомлений.
      </p>
    </div>
  </div>
  <form class="col-sm-6 auth" transition:fade>
    <div class="auth__inner">
      <h4>{titles[mode]}</h4>

      <div class="auth-subtitle">
        {#if mode === 'forget'}
          Ничего страшного, просто укажите свою почту, чтобы получить ссылку для
          сброса пароля.
        {:else if mode === 'reset'}
          Введите код из письма или пройдите по ссылке в письме для
          подтверждения регистрации
        {/if}
      </div>
      <div class="auth-info">
        {#if notifications?.length}{#each notifications as n}<span class="info" transition:fade>{n}.&nbsp;</span>{/each}{/if}
        {#if warnings?.length}{#each warnings as warn}<span class="warn" transition:fade>{warn}.&nbsp;</span>{/each}{/if}
      </div>
      {#if mode !== 'reset' && mode !== 'password'}
        <input
          autocomplete="username"
          bind:value={email}
          type="text"
          placeholder="Почта"
        />
      {/if}

      {#if mode === 'sign-up' || mode === 'sign-in'}
        <input
          autocomplete="current-password"
          bind:value={password}
          type="password"
          placeholder="Пароль"
        />
      {:else if mode === 'reset'}
        <input bind:value={code} type="text" placeholder="Код восстановления" />
      {:else if mode === 'password'}
        <input
          bind:value={password}
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
        <button class="submitbtn" disabled={process} on:click={() => auth(mode)}>
          {process ? '...' : titles[mode]}
        </button>
      </div>

      {#if mode === 'sign-in'}
        <div class="auth-actions">
          <a href={'#auth'} on:click|preventDefault={() => (mode = 'forget')}
            >Забыли пароль?</a
          >
        </div>
      {/if}

      {#if mode !== 'forget' && mode !== 'reset'}
        <div class="social-provider">
          <div class="providers-text">
            {#if mode === 'sign-up'}
              Или создайте аккаунт с&nbsp;помощью соцсетей
            {:else if mode === 'sign-in'}
              Или войдите через соцсети
            {/if}
          </div>

          <div class="social">
            <a
              href={'#auth'}
              class="facebook-auth"
              on:click|preventDefault={() => oauth('facebook')}
            >
              <Icon name="facebook" />
            </a>
            <a
              href={'#auth'}
              class="google-auth"
              on:click|preventDefault={() => oauth('google')}
            >
              <Icon name="google" />
            </a>
            <a
              href={'#auth'}
              class="vk-auth"
              on:click|preventDefault={() => oauth('vk')}
            >
              <Icon name="vk" />
            </a>
            <a
              href={'#auth'}
              class="github-auth"
              on:click|preventDefault={() => oauth('github')}
            >
              <Icon name="github" />
            </a>
          </div>
        </div>
      {/if}

      <div class="auth-control">
        <div class:show={mode === 'sign-up'}>
          <span
            class="auth-link"
            on:click|preventDefault={() => (mode = 'sign-in')}
            >У&nbsp;меня есть аккаунт</span
          >
        </div>
        <div class:show={mode === 'sign-in'}>
          <span
            class="auth-link"
            on:click|preventDefault={() => (mode = 'sign-up')}
            >У&nbsp;меня еще нет аккаунта</span
          >
        </div>
        <div class:show={mode === 'forget'}>
          <span
            class="auth-link"
            on:click|preventDefault={() => (mode = 'sign-in')}>Я знаю пароль</span
          >
        </div>
        <div class:show={mode === 'reset'}>
          <span class="auth-link" on:click|preventDefault={() => auth('resend')}
            >Отправить код повторно</span
          >
        </div>
      </div>
    </div>
  </form>
</div>

<style lang="scss">
  .view {
    background: #fff;
    position: relative;

    input {
      font-size: 1.7rem;
    }

    :global(h4) {
      margin-bottom: 0.6em;
      text-align: left;
    }
  }

  .view--sign-up {
    .auth-image {
      order: 2;
    }

    .auth-image:before {
      background: linear-gradient(
        0deg,
        rgba(20, 20, 20, 0.8),
        rgba(20, 20, 20, 0.8)
      );
      content: '';
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
    }
  }

  .auth-image {
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

  .auth-image__text {
    display: none;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    text-align: left;
    z-index: 1;

    a {
      color: #fff;

      &:hover {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  .auth-image__text.show {
    display: flex;
  }

  .auth-benefits {
    flex: 1;
  }

  .disclamer {
    color: #9fa1a7;
    @include font-size(1.2rem);
  }

  .auth-actions {
    @include font-size(1.5rem);
    margin-top: 1.6rem;
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

  .social-provider {
    border-bottom: 1px solid #141414;
    border-top: 1px solid #141414;
    margin-top: 1em;
    padding: 0.8em 0 1em;
  }

  .social {
    background-color: white !important;
    display: flex;
    margin: 0 -5px;

    > :global(*) {
      background-color: #f7f7f7;
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

  .auth-control {
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

  .auth-link {
    cursor: pointer;
  }

  .providers-text {
    @include font-size(1.5rem);
    margin-bottom: 1em;
    text-align: center;
  }

  .auth-subtitle {
    @include font-size(1.5rem);
    margin: 1em;
  }

  .auth-info {
    min-height: 5em;
    font-weight: 400;
    font-size: smaller;
    .warn { color: #a00; }
    .info { color: gray; }
  }
</style>
