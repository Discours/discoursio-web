import { For, Show } from 'solid-js/web'
import Icon from './Icon'
import { useStore, Warning } from '../../store'
import { baseUrl } from '../../graphql/client'
import { createSignal } from 'solid-js'
import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import './AuthModal.scss'
import { useAuth } from '../../store/auth'

type AuthMode = 'sign-in' | 'sign-up' | 'forget' | 'reset' | 'resend' | 'password'

export default (props: { code?: string; mode?: string }) => {
  const [t] = useI18n()
  const [mode, setMode] = createSignal<AuthMode>('sign-in')
  const [state, { hideModal, warn }] = useStore()
  const [auth, { signIn, signUp, signCheck /* TODO: forget, resend, reste */ }] = useAuth()
  // TODO: notifications destroy timeout

  let emailElement: HTMLInputElement | undefined
  let pass2Element: HTMLInputElement | undefined
  let passElement: HTMLInputElement | undefined
  let codeElement: HTMLInputElement | undefined
  let usernameElement: HTMLInputElement | undefined // TODO: place this element
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

  const localAuth = () => {
    console.log('[auth] handshaking')
    auth.handshaking = true
    // 1 check format
    const emailTyped =
      (emailElement?.value?.length || 0) > 5 &&
      emailElement?.value.includes('@') &&
      emailElement.value.includes('.')

    // 2 check email
    if (!emailTyped) {
      warn({ body: t('Please check your email address'), kind: 'error' })
      console.log('[auth] email checked')
    } else {
      const check = signCheck(emailElement?.value)

      console.log(check)
      console.log(prompt())
      switch (mode()) {
        case 'sign-up':
          if (check) {
            warn({
              body: t('We know you, please try to login'),
              kind: 'error'
            })
          }

          // TODO: validation status on form
          break
        case 'sign-in':
          if (!check) {
            warn({
              body: t('No such account, please try to register'),
              kind: 'error'
            })
          }

          break
        default:
          console.log('auth: passing email check')
      }
    }

    console.log(prompt())

    switch (mode()) {
      case 'sign-in':
        signIn(emailElement?.value, passElement?.value)
        break
      case 'sign-up':
        if (pass2Element?.value !== passElement?.value)
          warn({ body: t('Passwords are not same'), kind: 'error' })
        else signUp(usernameElement?.value, emailElement?.value, passElement?.value)
        break
      case 'reset':
        // send reset-code to login with email
        console.log('[auth] reset code: ' + codeElement?.value)
        // TODO: signInReset(codeElement?.value)
        break
      case 'resend':
        // send code to email
        break
      case 'forget':
        // shows forget mode of auth-modal
        // warn({ body: t('Passwords are not same'), kind: 'error' })
        break
      default:
        auth.handshaking = false
    }
  }
  const submitHandler = (ev: Event) => {
    console.debug(ev)
    ev.preventDefault()
  }
  return (
    <div class='row view' classList={{ 'view--sign-up': mode() === 'sign-up' }}>
      <div class='col-sm-6 d-md-none auth-image'>
        <div class='auth-image__text' classList={{ show: mode() === 'sign-up' }}>
          <h2>{t('Discours')}</h2>
          <h4>{t(`Join the global community of authors!`)}</h4>
          <p class='auth-benefits'>
            Познакомитесь с&nbsp;выдающимися людьми нашего времени, участвуйте в&nbsp;редактировании
            и&nbsp;обсуждении статей, выступайте экспертом, оценивайте материалы других авторов
            со&nbsp;всего мира и&nbsp;определяйте, какие статьи будут опубликованы в&nbsp;журнале. Каждый
            день вас ждут новые истории и&nbsp;ещё много всего интересного!
          </p>
          <p class='disclamer'>
            Регистрируясь, вы&nbsp;даёте согласие с&nbsp;
            <NavLink href='/about/terms-of-use' onClick={hideModal}>
              правилами пользования
            </NavLink>
            сайтом, на&nbsp;обработку персональных данных и&nbsp;на&nbsp;получение почтовых уведомлений.
          </p>
        </div>
      </div>
      <form class='col-sm-6 auth' onSubmit={submitHandler}>
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
          <div class={`auth-info ${!state.warnings || !state.warnings.length ? 'hidden' : ''}`}>
            <For each={state.warnings}>{(w: Warning) => <span class='warn'>{w.body}.&nbsp;</span>}</For>
          </div>
          <Show when={mode() !== 'reset' && mode() !== 'password'}>
            <input autocomplete='username' ref={emailElement} type='text' placeholder={t('Email')} />
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
            <input ref={pass2Element} type='password' placeholder={t('New password again')} />
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
