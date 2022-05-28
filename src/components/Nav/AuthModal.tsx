import { For, Show } from 'solid-js/web'
import Icon from './Icon'
import { useStore, Warning } from '../../store'
import { baseUrl } from '../../graphql/client'
import { createSignal } from 'solid-js'
import './AuthModal.scss'

let emailElement: HTMLInputElement
let pass2Element: HTMLInputElement
let passElement: HTMLInputElement
let usernameElement: HTMLInputElement // TODO: place this element

type AuthMode = 'sign-in' | 'sign-up' | 'forget' | 'reset' | 'resend' | 'password'

const titles = {
  'sign-up': 'Создать аккаунт',
  'sign-in': 'Войти в Дискурс',
  forget: 'Забыли пароль?',
  reset: 'Подтвердите почту и действие совершится',
  resend: 'Выслать подтверждение',
  password: 'Введите новый пароль'
}

export default (props: { code?: string; mode?: string }) => {
  const [mode, setMode] = createSignal<AuthMode>('sign-in')
  const [state, { hideModal, warn, signIn, signUp, signCheck /* TODO: forget, resend, reste */ }] =
    useStore()
  // TODO: notifications destroy timeout

  const oauth = (provider: string) => {
    window.open(`${baseUrl}/oauth/${provider}`, provider, 'width=740, height=420')
    hideModal()
  }

  const auth = () => {
    state.handshaking = true
    // 1 check format
    const emailTyped =
      emailElement.value.length > 5 && emailElement.value.includes('@') && emailElement.value.includes('.')

    if (!emailTyped) warn({ body: 'Пожалуйста, проверьте введенный адрес почты', kind: 'error' })
    // TODO: 2 check if used
    // eslint-disable-next-line no-constant-condition
    else if (false) {
      const check = signCheck(emailElement.value)

      console.log(check)

      switch (mode()) {
        case 'sign-up':
          if (check) {
            warn({
              body: 'Такой адрес почты уже зарегистрирован, попробуйте залогиниться',
              kind: 'error'
            })
          }

          // TODO: validation status on form
          break
        case 'sign-in':
          if (!check) {
            warn({
              body: 'Такой адрес не найден, попробуйте зарегистрироваться',
              kind: 'error'
            })
          }

          break
        default:
          console.log('auth: passing email check')
      }
    }

    switch (mode()) {
      case 'sign-in':
        signIn(emailElement.value, passElement.value)
        break
      case 'sign-up':
        if (pass2Element.value !== passElement.value) warn({ body: 'Пароли не совпадают', kind: 'error' })
        else signUp(usernameElement.value, emailElement.value, passElement.value)

        break
      case 'reset':
        // TODO: implement, resend, forget
        break
      default:
        state.handshaking = false
    }
  }

  return (
    <div class='row view' classList={{ 'view--sign-up': props.mode === 'sign-up' }}>
      <div class='col-sm-6 d-md-none auth-image'>
        <div class='auth-image__text' classList={{ show: props.mode === 'sign-up' }}>
          <h2>Дискурс</h2>
          <h4>Присоединятесь к&nbsp;глобальному сообществу авторов со&nbsp;всего мира!</h4>
          <p class='auth-benefits'>
            Познакомитесь с&nbsp;выдающимися людьми нашего времени, участвуйте в&nbsp;редактировании
            и&nbsp;обсуждении статей, выступайте экспертом, оценивайте материалы других авторов
            со&nbsp;всего мира и&nbsp;определяйте, какие статьи будут опубликованы в&nbsp;журнале. Каждый
            день вас ждут новые истории и&nbsp;ещё много всего интересного!
          </p>
          <p class='disclamer'>
            Регистрируясь, вы&nbsp;даёте согласие с&nbsp;
            <a href='/about/terms-of-use' onClick={hideModal}>
              правилами пользования
            </a>
            сайтом, на&nbsp;обработку персональных данных и&nbsp;на&nbsp;получение почтовых уведомлений.
          </p>
        </div>
      </div>
      <form class='col-sm-6 auth'>
        <div class='auth__inner'>
          <h4>{titles[mode()]}</h4>

          <div class={`auth-subtitle ${props.mode === 'forget' ? '' : 'hidden'}`}>
            <Show
              when={props.mode === 'forget'}
              fallback={
                <Show when={props.mode === 'reset'}>
                  Введите код из&nbsp;письма или пройдите по&nbsp;ссылке в&nbsp;письме для подтверждения регистрации
                </Show>
              }
            >
              Ничего страшного, просто укажите свою почту, чтобы получить ссылку для сброса пароля.
            </Show>
          </div>
          <div class={`auth-info ${!state.warnings || !state.warnings.length ? 'hidden' : ''}`}>
            <For each={state.warnings}>{(w: Warning) => <span class='warn'>{w.body}.&nbsp;</span>}</For>
          </div>
          <Show when={props.mode !== 'reset' && props.mode !== 'password'}>
            <input autocomplete='username' ref={emailElement} type='text' placeholder='Почта' />
          </Show>

          <Show when={props.mode === 'sign-up' || props.mode === 'sign-in'}>
            <input autocomplete='current-password' ref={passElement} type='password' placeholder='Пароль' />
          </Show>
          <Show when={props.mode === 'reset'}>
            <input value={props.code} type='text' placeholder='Код восстановления' />
          </Show>
          <Show when={props.mode === 'password'}>
            <input ref={passElement} type='password' placeholder='Новый пароль' />
            <input ref={pass2Element} type='password' placeholder='Подтверждение пароля' />
          </Show>

          <div>
            <button class='submitbtn' disabled={state.handshaking} onClick={auth}>
              {state.handshaking ? '...' : titles[mode()]}
            </button>
          </div>

          <Show when={props.mode === 'sign-in'}>
            <div class='auth-actions'>
              <a href={'#auth'} onClick={() => setMode('forget')}>
                Забыли пароль?
              </a>
            </div>
          </Show>

          <Show when={mode() !== 'forget' && mode() !== 'reset'}>
            <div class='social-provider'>
              <div class='providers-text'>
                <Show
                  when={mode() === 'sign-up'}
                  fallback={<Show when={mode() === 'sign-in'}>Или войдите через соцсети</Show>}
                >
                  Или создайте аккаунт с&nbsp;помощью соцсетей
                </Show>
              </div>

              <div class='social'>
                <a href={'#auth'} class='facebook-auth' onClick={() => oauth('facebook')}>
                  <Icon name='facebook' />
                </a>
                <a href={'#auth'} class='google-auth' onClick={() => oauth('google')}>
                  <Icon name='google' />
                </a>
                <a href={'#auth'} class='vk-auth' onClick={() => oauth('vk')}>
                  <Icon name='vk' />
                </a>
                <a href={'#auth'} class='github-auth' onClick={() => oauth('github')}>
                  <Icon name='github' />
                </a>
              </div>
            </div>
          </Show>

          <div class='auth-control'>
            <div classList={{ show: mode() === 'sign-up' }}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                У&nbsp;меня есть аккаунт
              </span>
            </div>
            <div classList={{ show: props.mode === 'sign-in' }}>
              <span class='auth-link' onClick={() => setMode('sign-up')}>
                У&nbsp;меня еще нет аккаунта
              </span>
            </div>
            <div classList={{ show: props.mode === 'forget' }}>
              <span class='auth-link' onClick={() => setMode('sign-in')}>
                Я знаю пароль
              </span>
            </div>
            <div classList={{ show: props.mode === 'reset' }}>
              <span class='auth-link' onClick={() => setMode('resend')}>
                Отправить код повторно
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
