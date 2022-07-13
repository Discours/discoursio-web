import { Show } from 'solid-js/web'
import Icon from './Icon'
import { useStore } from '../../context'
import { baseUrl } from '../../graphql/client'
import { createEffect, createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import './AuthModal.scss'
import { useAuth } from '../../context/auth'
import { OperationResult, useClient } from 'solid-urql'
import { usePromiseQuery } from '../../utils/promiseQuery'
import signCheckQuery from '../../graphql/q/auth-check'
import { Form } from 'solid-js-form'
import * as Yup from 'yup'

type AuthMode = 'sign-in' | 'sign-up' | 'forget' | 'reset' | 'resend' | 'password'

export default (props: { code?: string; mode?: string }) => {
  const [t] = useI18n()
  const [mode, setMode] = createSignal<AuthMode>('sign-in')
  const [error, setError] = createSignal('')
  const [state, { hideModal }] = useStore()
  const [auth, { signIn, signUp, forget, resend, reset }] = useAuth()
  const [validation, setValidation] = createSignal({})
  const [initial, setInitial] = createSignal({})

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

  // switching initial values and validatiors
  createEffect(() => {
    let ini: { [key:string]: string } = { email: '' }
    let vs: { [key:string]: any } = { email: Yup.string().required() }
    switch(mode()) {
      case 'sign-in':
        ini = { username: '', password: '' }
        vs = {
          username: Yup.string().required(),
          password: Yup.string().required(),
        }
        signCheck(emailElement?.value || '')
        break
      case 'sign-up':
        ini = { username: '', password: '', email: '' }
        vs = {
          username: Yup.string(),
          email: Yup.string().email().required(),
          password: Yup.string().required(),
        }
        signCheck(emailElement?.value || '')
        break
      case 'forget':
        ini = { email: '' }
        vs = { email: Yup.string().email().required() }
        break
      case 'reset':
        ini = { code: '' }
        vs = { code: Yup.string().required() }
        break
      case 'resend':
        ini = { email: '' }
        vs = { email: Yup.string().email().email().required() }
        break
      case 'password':
        ini = { password: '', password2: '' }
        vs = { password: Yup.string().required(), password2: Yup.string().required() }
        break
      default:
        break
    }
    setValidation(vs)
    setInitial(ini)
  })

  // 3rd party provedier auth handler
  const oauth = (provider: string): void => {
    const popup = window.open(`${baseUrl}/oauth/${provider}`, provider, 'width=740, height=420')
    popup?.focus()
    hideModal()
  }

  // check email properly typed
  const isProperEmail = (email: string): boolean => (email.length || 0) > 5 && email.includes('@') && email.includes('.')

  // check email request
  const client = useClient()
  const [promiseQuery, ] = usePromiseQuery(client)
  const signCheck = (email: string, register = false) => promiseQuery(signCheckQuery, { email })
    .then(({ data, error }: OperationResult) => {
      if(error) setError(error.message)
      if (data?.isEmailUsed && register) setError(t('We know you, please try to sign in'))
      if (!data?.isEmailUsed && !register) setError(t('Email is unknown, please try to sign up'))
    })

  // local auth handler
  const localAuth = async () => {
    console.log('[auth] native account processing')
    // check email
    if (!isProperEmail(emailElement?.value || '')) {
      setError(t('Please check your email address'))
      console.log('[auth] email wrong format')
    } else {
      switch (mode()) {
        case 'sign-up':
          signCheck(emailElement?.value || '', true)
          break
        case 'sign-in':
          signCheck(emailElement?.value || '')
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
          setError(t('Passwords are not equal'))
        else {
          signUp(emailElement?.value, passElement?.value) //, usernameElement?.value)
        }
        break
      case 'reset':
        // send reset-code to login with email
        console.log('[auth] reset code: ' + codeElement?.value)
        reset(codeElement?.value)
        break
      case 'resend':
        resend(emailElement?.value)
        break
      case 'forget':
        // shows forget mode of auth-modal
        if(pass2Element?.value !== passElement?.value) setError(t('Passwords are not equal'))
        else forget(passElement?.value)
        break
      default:
        console.log('[auth] unknown auth mode', mode())
    }
  }

  // hiding itself if finished
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
      <div class='col-sm-6 auth'>
        <Form
          initialValues={initial()}
          validation={validation()}
          onSubmit={async (form) => {
            console.log(form.values)
          }}
        >
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

            <Show when={error()}>
              <div class={`auth-info`}>
                <ul>
                  <li class='warn'>{error()}</li>
                </ul>
              </div>
            </Show>

            <Show when={false && mode() === 'sign-up'}>
              <input name='username' autocomplete='username' ref={usernameElement} type='text'
                     placeholder={t('Username')}/>
            </Show>
            <Show when={mode() !== 'reset' && mode() !== 'password'}>
              <input name='email' autocomplete='email' ref={emailElement} type='text'
                     placeholder={t('Email')}/>
            </Show>

            <Show when={mode() === 'sign-up' || mode() === 'sign-in' || mode() === 'password'}>
              <input
                name='password'
                autocomplete='current-password'
                ref={passElement}
                type='password'
                placeholder={t('Password')}
              />
            </Show>
            <Show when={mode() === 'reset'}>
              <input name='resetcode' ref={codeElement} value={props.code} type='text'
                     placeholder={t('Reset code')}/>
            </Show>

            <Show when={mode() === 'password' || mode() === 'sign-up'}>
              <input name='password2' ref={pass2Element} type='password' placeholder={t('Password again')}
                     autocomplete=""/>
            </Show>
            <div>
              <button class='button submitbtn' disabled={auth.handshaking} onClick={localAuth}>
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
                    <Icon name='facebook'/>
                  </a>
                  <a href={''} class='google-auth' onClick={() => oauth('google')}>
                    <Icon name='google'/>
                  </a>
                  <a href={''} class='vk-auth' onClick={() => oauth('vk')}>
                    <Icon name='vk'/>
                  </a>
                  <a href={''} class='github-auth' onClick={() => oauth('github')}>
                    <Icon name='github'/>
                  </a>
                </div>
              </div>
            </Show>

            <div class='auth-control'>
              <div classList={{show: mode() === 'sign-up'}}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                {t('I have an account')}
              </span>
              </div>
              <div classList={{show: mode() === 'sign-in'}}>
              <span class='auth-link' onClick={() => setMode('sign-up')}>
                {t('I have no account yet')}
              </span>
              </div>
              <div classList={{show: mode() === 'forget'}}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                {t('I know the password')}
              </span>
              </div>
              <div classList={{show: mode() === 'reset'}}>
              <span class='auth-link' onClick={() => setMode('resend')}>
                {t('Resend code')}
              </span>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
