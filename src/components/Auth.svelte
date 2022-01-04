<script lang="ts">
	import { page } from '$app/stores'
	import { SIGN_IN, SIGN_UP } from '../lib/queries'
	import { client } from '../lib/client'
	import Icon from './DiscoursIcon.svelte'
	import { session, token as tokenStore } from '../stores/user'
	import { openModal } from '../stores/app'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { API_ENDPOINT } from '../lib/client'
	const prefix = 'Ошибка сервера: '

	export let mode = 'login'
	export let code = ''
	export let warnings = ['']
	let email,
		password,
		password2 = ''
	let warnTimeout

	const authSuccess = ({ token, user }) => {
		$tokenStore = token
		$session = user
		$openModal = ''
	}

	const authFailure = ({ error }) => {
		console.log('auth: error handling')
		console.log(error)
		warnings.push(prefix + error)
		warnTimeout = setTimeout(
			() => (warnings = warnings.filter((w) => w !== prefix + error)),
			4200
		)
	}

	const auth = async (q) => {
		console.log('auth: with discours.io account ')
		const res = await client.request(q, { email, password })
		const { token, user, error } = res[q === SIGN_IN ? 'signIn' : 'registerUser']
		if (token) authSuccess({ token, user })
		else authFailure({ error })
	}

	const login = async () => auth(SIGN_IN)
	const register = async () => auth(SIGN_UP)

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
		if (password2 === password) {
			console.log('auth: renewing password')
		}
		// TODO: implement me
	}

	onMount(() => $page.url.searchParams.get('code') && reset())

	const oauth = (provider: string) => {
		// $openModal = false
		window.open(
			API_ENDPOINT + `/oauth/${provider}`,
			provider,
			'width=740, height=420'
		)
	}
</script>

<!-- svelte-ignore a11y-missing-attribute -->
<div
	class="row view"
	class:view--registration={mode === 'register'}
	transition:fade
>
	<div class="col-sm-6 d-md-none login-image">
		<div class="login-image__text" class:show={mode === 'register'}>
			<h2>Дискурс</h2>
			<h4>
				Присоединятесь к&nbsp;глобальному сообществу авторов со&nbsp;всего мира!
			</h4>
			<p class="registration-benefits">
				Познакомитесь с&nbsp;выдающимися людьми нашего времени, участвуйте
				в&nbsp;редактировании и&nbsp;обсуждении статей, выступайте экспертом,
				оценивайте материалы других авторов со&nbsp;всего мира и&nbsp;определяйте,
				какие статьи будут опубликованы в&nbsp;журнале. Каждый день вас ждут новые
				истории и&nbsp;ещё много всего интересного!
			</p>
			<p class="disclamer">
				Регистрируясь, вы&nbsp;даёте согласие с&nbsp;<a href={'/rules'}
					>правилами пользования</a
				>
				сайтом, на&nbsp;<a href={'/agreement'}>обработку персональных данных</a>
				и&nbsp;на&nbsp;получение почтовых уведомлений.
			</p>
		</div>
	</div>
	<form class="col-sm-6 auth" transition:fade>
		<div class="auth__inner">
			<h4>
				{#if mode === 'register'}
					Создать аккаунт
				{:else if mode === 'login'}
					Войти в&nbsp;Дискурс
				{:else if mode === 'forget'}
					Забыли пароль?
				{:else if mode === 'reset'}
					Подтвердите почту и действие совершится
				{:else if mode === 'password'}
					Введите новый пароль
				{/if}
			</h4>

			<div class="auth-subtitle">
				{#if mode === 'forget'}
					Ничего страшного, просто укажите свою почту, чтобы получить ссылку для
					сброса пароля.
				{:else if mode === 'reset'}
					Введите код из письма или пройдите по ссылке в письме для подтверждения
					регистрации
				{/if}
			</div>

			<div class="auth-warnings" style="color: red;" transition:fade>
				{#each warnings as warn}
					<p>{warn}</p>
				{/each}
			</div>

			{#if mode !== 'reset' && mode !== 'password'}
				<input
					autocomplete="username"
					bind:value={email}
					type="text"
					placeholder="Почта"
				/>
			{/if}

			{#if mode === 'register' || mode === 'login'}
				<input
					autocomplete="current-password"
					bind:value={password}
					type="password"
					placeholder="Пароль"
				/>
			{:else if mode === 'reset'}
				<input bind:value={code} type="text" placeholder="Код восстановления" />
			{:else if mode === 'password'}
				<input bind:value={password} type="password" placeholder="Новый пароль" />
				<input
					bind:value={password2}
					type="password"
					placeholder="Подтверждение пароля"
				/>
			{/if}

			<div>
				<button
					class="button submitbtn"
					on:click={(mode === 'register' && register) ||
						(mode === 'login' && login) ||
						(mode === 'forget' && forget) ||
						(mode === 'reset' && reset) ||
						(mode === 'password' && renew)}
				>
					{(mode === 'register' && 'Создать аккаунт') ||
						(mode === 'login' && 'Войти') ||
						(mode === 'forget' && 'Выслать пароль') ||
						(mode === 'reset' && ' Подтвердить') ||
						(mode === 'password' && 'Создать новый пароль')}
				</button>
			</div>

			{#if mode === 'login'}
				<div class="auth-actions">
					<a href={''} on:click|preventDefault={() => (mode = 'forget')}>Забыли пароль?</a>
				</div>
			{/if}

			{#if mode !== 'forget' && mode !== 'reset'}
				<div class="social-provider">
					<div class="providers-text">
						{#if mode === 'register'}
							Или создайте аккаунт с&nbsp;помощью соцсетей
						{:else if mode === 'login'}
							Или войдите через соцсети
						{/if}
					</div>

					<div class="social">
						<a
							href={''}
							class="facebook-auth"
							on:click|preventDefault={() => oauth('facebook')}
						>
							<Icon name="facebook" />
						</a>
						<a
							href={''}
							class="google-auth"
							on:click|preventDefault={() => oauth('google')}
						>
							<Icon name="google" />
						</a>
						<a href={''} class="vk-auth" on:click|preventDefault={() => oauth('vk')}>
							<Icon name="vk" />
						</a>
					</div>
				</div>
			{/if}

			<div class="auth-control">
				<div class:show={mode === 'register'}>
					<span class="auth-link" on:click|preventDefault={() => (mode = 'login')}
						>У&nbsp;меня есть аккаунт</span
					>
				</div>
				<div class:show={mode === 'login'}>
					<span class="auth-link" on:click|preventDefault={() => (mode = 'register')}
						>У&nbsp;меня еще нет аккаунта</span
					>
				</div>
				<div class:show={mode === 'forget'}>
					<span class="auth-link" on:click|preventDefault={() => (mode = 'login')}
						>Я знаю пароль</span
					>
				</div>
				<div class:show={mode === 'reset'}>
					<span class="auth-link" on:click|preventDefault={() => resend()}
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
		max-width: 1000px;
		position: relative;
		width: 80%;

		input {
			font-size: 1.7rem;
		}

		:global(h4) {
			margin-bottom: 0.6em;
			text-align: left;
		}
	}

	.view--registration {
		.login-image {
			order: 2;
		}

		.login-image:before {
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
		text-align: left;
		z-index: 1;

		a {
			color: #fff;

			&:hover {
				color: rgba(255, 255, 255, 0.7);
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

	.auth-warnings {
		color: #a00;
		font-weight: 400;
		font-size: smaller;
	}
</style>
