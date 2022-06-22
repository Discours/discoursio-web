import { For, Show } from 'solid-js/web'
import Icon from './Icon'
import { useStore } from '../../store'
import { baseUrl } from '../../graphql/client'
import { createEffect, createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import './AuthModal.scss'
import { useAuth } from '../../store/auth'
import { OperationResult, useClient } from 'solid-urql'
import { usePromiseQuery } from '../../utils/promiseQuery'
import signCheckQuery from '../../graphql/q/auth-check'

type AuthMode = 'sign-in' | 'sign-up' | 'forget' | 'reset' | 'resend' | 'password'

export default (props: { code?: string; mode?: string }) => {
  const [t] = useI18n()
  const [mode, setModeSignal] = createSignal<AuthMode>('sign-in')
  const [state, { hideModal }] = useStore()
  const [auth, { signIn, signUp, forget, resend, reset }] = useAuth()
  const [formValidations, setValidations] = createSignal<string[]>([])
  const setMode = (m: AuthMode) => {
    setValidations([])
    setModeSignal(m)
  }
  let emailElement: HTMLInputElement | undefined
  let pass2Element: HTMLInputElement | undefined
  let passElement: HTMLInputElement | undefined
  let codeElement: HTMLInputElement | undefined
  let usernameElement: HTMLInputElement | undefined
  const titles = {
    'sign-up': t('Create account'),
    'sign-in': t('Enter the Discours'),
    forget: t('Forget password?'),
    reset: t('Please, confirm your email to finish'),
    resend: t('Resend code'),
    password: t('Enter your new password')
  }

  const oauth = (provider: string) => {
    const popup = window.open(`${baseUrl}/oauth/${provider}`, provider, 'width=740, height=420')
    popup?.focus()
    hideModal()
  }
  const client = useClient()
  const [promiseQuery, ] = usePromiseQuery(client)
  const signCheck = (email: string): Promise<boolean> => promiseQuery(signCheckQuery, { email })
    .then(({ data, error }: OperationResult) => {
      let result = false
      if (error) {
        setValidations(v => [...v, error.message]) // TODO: kind error
      } else {
        if (data?.isEmailUsed) {
          setValidations(v => [...v, t('Email is used')]) // TODO: kind warn
          result = true
        } else {
          console.log('[auth] email was not used')
        }
      }
      return Promise.resolve(result)
    })

  const localAuth = async () => {
    console.log('[auth] native account processing')
    // 1 check format
    const emailTyped =
      (emailElement?.value?.length || 0) > 5 &&
      emailElement?.value.includes('@') &&
      emailElement.value.includes('.')
    console.log(`[auth] email is ${emailTyped?'':'NOT '}properly typed`)
    // 2 check email
    if (!emailTyped) {
      setValidations((v: string[]) => [...v, t('Please check your email address')])
      console.log('[auth] email wrong format')
    } else {
      switch (mode()) {
        case 'sign-up':
          signCheck(emailElement?.value || '')
            .then((result: boolean) => {
              if (result) setValidations(v => [...v, t('We know you, please try to login')]) // error
              // TODO: validation status on form
            })
          break
        case 'sign-in':
          signCheck(emailElement?.value || '')
            .then((result: boolean) => {
              if (!result) setValidations(v => [...v, t('No such account, please try to register')]) // error
            })
          break
        default:
          console.log('[auth] passing email check')
      }
    }
    switch (mode()) {
      case 'sign-in':
        signIn(emailElement?.value, passElement?.value)
        break
      case 'sign-up':
        if (pass2Element?.value !== passElement?.value)
          setValidations(v=>[...v, t('Passwords are not equal')]) //, kind: 'error' })
        else {
          signUp(emailElement?.value, passElement?.value) //, usernameElement?.value)
        }
        break
      case 'reset':
        // send reset-code to login with email
        console.log('[auth] reset code: ' + codeElement?.value)
        // TODO: signInReset(codeElement?.value)
        break
      case 'resend':
        // TODO: send code to email
        break
      case 'forget':
        // shows forget mode of auth-modal
        // warn({ body: t('Passwords are not equal'), kind: 'error' })
        break
      default:
        console.log('[auth] unknown auth mode', mode())
    }
  }
  createEffect(() => {
    if (auth.authorized && state.modal === 'auth') {
      console.log('[auth] success, hiding modal')
      hideModal()
    }
  })
  return (
    <div class='row view' classList={{ 'view--sign-up': mode() === 'sign-up' }}>
      <div class='col-sm-6 d-md-none auth-image'>
        <div class='auth-image__text' classList={{ show: mode() === 'sign-up' }}>
          <h2>{t('Discours')}</h2>
          <h4>{t(`Join the global community of authors!`)}</h4>
          <p class='auth-benefits'>
            {t('Get to know the most intelligent people of our time, edit and discuss the articles, share your expertise, rate and decide what to publish in the magazine')}.&nbsp;
            {t('New stories every day and even more!')}
          </p>
          <p class='disclamer'>
            {t('By signing up you agree with our')}
            <NavLink href='/about/terms-of-use' onClick={hideModal}>
              {' ' + t('terms of use')}
            </NavLink>
            , {t('personal data usage and email notifications')}.
          </p>
        </div>
      </div>
      <form class='col-sm-6 auth' onSubmit={(ev) => ev.preventDefault()}>
        <div class='auth__inner'>
          <h4>{titles[mode()]}</h4>

          <div class={`auth-subtitle ${mode() === 'forget' ? '' : 'hidden'}`}>
            <Show
              when={mode() === 'forget'}
              fallback={
                <Show when={mode() === 'reset'}>
                  {t('Enter the code or click the link from email to confirm')}
                </Show>
              }
            >
              {t('Everything is ok, please give us your email address')}
            </Show>
          </div>
          <div class={`auth-info`}>
            <ul>
              <For each={formValidations()}>
                {(w: string) => (<li class='warn'>{w}</li>)}
              </For>
            </ul>
          </div>

          <Show when={false && mode() === 'sign-up'}>
            <input autocomplete='username' ref={usernameElement} type='text' placeholder={t('Username')} />
          </Show>
          <Show when={mode() !== 'reset' && mode() !== 'password'}>
            <input autocomplete='email' ref={emailElement} type='text' placeholder={t('Email')} />
          </Show>

          <Show when={mode() === 'sign-up' || mode() === 'sign-in'}>
            <input
              autocomplete='current-password'
              ref={passElement}
              type='password'
              placeholder={t('Password')}
            />
          </Show>
          <Show when={mode() === 'reset'}>
            <input ref={codeElement} value={props.code} type='text' placeholder={t('Reset code')} />
          </Show>
          <Show when={mode() === 'password'}>
            <input ref={passElement} type='password' placeholder={t('New password')} />
          </Show>
          <Show when={mode() === 'password' || mode() === 'sign-up'}>
            <input ref={pass2Element} type='password' placeholder={t('Password again')} autocomplete="" />
          </Show>
          <div>
            <button class='submitbtn' disabled={auth.handshaking} onClick={localAuth}>
              {auth.handshaking ? '...' : titles[mode()]}
            </button>
          </div>

          <Show when={mode() === 'sign-in'}>
            <div class='auth-actions'>
              <a href={''} onClick={() => setMode('forget')}>
                {t('Forget password?')}
              </a>
            </div>
          </Show>

          <Show when={mode() === 'sign-in' || mode() === 'sign-up'}>
            <div class='social-provider'>
              <div class='providers-text'>{t('Or continue with social network')}</div>
              <div class='social'>
                <a href={''} class='facebook-auth' onClick={() => oauth('facebook')}>
                  <Icon name='facebook' />
                </a>
                <a href={''} class='google-auth' onClick={() => oauth('google')}>
                  <Icon name='google' />
                </a>
                <a href={''} class='vk-auth' onClick={() => oauth('vk')}>
                  <Icon name='vk' />
                </a>
                <a href={''} class='github-auth' onClick={() => oauth('github')}>
                  <Icon name='github' />
                </a>
              </div>
            </div>
          </Show>

          <div class='auth-control'>
            <div classList={{ show: mode() === 'sign-up' }}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                {t('I have an account')}
              </span>
            </div>
            <div classList={{ show: mode() === 'sign-in' }}>
              <span class='auth-link' onClick={() => setMode('sign-up')}>
                {t('I have no account yet')}
              </span>
            </div>
            <div classList={{ show: mode() === 'forget' }}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                {t('I know the password')}
              </span>
            </div>
            <div classList={{ show: mode() === 'reset' }}>
              <span class='auth-link' onClick={() => setMode('resend')}>
                {t('Resend code')}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
