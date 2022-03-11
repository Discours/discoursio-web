import { API_ENDPOINT } from '../../lib/graphql/client'
import { For, Show } from 'solid-js/web'
import Icon from './Icon'
import { useStore } from '~/store'
import { createStore } from 'solid-js/store'

const titles = {
  'sign-up': 'Создать аккаунт',
  'sign-in': 'Войти в Дискурс',
  forget: 'Забыли пароль?',
  reset: 'Подтвердите почту и действие совершится',
  resend: 'Выслать подтверждение',
  password: 'Введите новый пароль'
}

let emailElement
let pass2Element
let passElement

export default (props) => {
  const [state, setState] = createStore({
    handshaking: false,
    warnings: [],
    notifications: [],
    token: '',
    session: {}
  })
  const store = useStore()
  const { register, login, checkEmail, logout } = store[1]
  const modes = {
    'sign-in': login,
    'sign-up': register,
    'sign-out': logout
    // TODO: reset, resend
  }
  // TODO: notifications destroy timeout
  const authSuccess = ({ token, user }) => {
    console.log('auth: success')
    setState({ handshaking: false, notifications: ['welcome!'], token, session: user })
    props.closeModal()
  }

  const oauth = (provider: string) => {
    window.open(`${API_ENDPOINT}/oauth/${provider}`, provider, 'width=740, height=420')
    props.closeModal()
  }

  const authFailure = ({ error }) => {
    setState({ handshaking: false, warnings: [...state.warnings, error] })
  }

  const _auth = (endpoint: string) => {
    const text = 'Пожалуйста, подождите..'

    setState({ notifications: [...state.notifications, text] })
    let opts

    opts = { email: emailElement.value, password: passElement.value }

    if (props.code) opts.code = props.code

    modes[endpoint](opts)
      .then((r) =>
        r.ok ? r.json().then(authSuccess) : authFailure({ error: 'Неизвестная ошибка, попробуйте ещё раз' })
      )
      .catch((error) => authFailure({ error }))
  }
  const auth = (endpoint: string) => {
    setState({ handshaking: true })
    const emailTyped =
      emailElement.value.length > 5 && emailElement.value.includes('@') && emailElement.value.includes('.')

    if (!emailTyped) authFailure({ error: 'Пожалуйста, проверьте введенный адрес почты' })

    if (props.mode === 'sign-up') {
      setState({ notifications: [...state.notifications, 'Ищем учётную запись с таким почтовым адресом'] })
      checkEmail(emailElement.value).then((r) => {
        if (r.ok) _auth(endpoint)
        else
          authFailure({
            error: 'Такой адрес почты уже зарегистрирован, попробуйте залогиниться'
          })
      })
    } else {
      _auth(endpoint)
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
            <a href='/about/terms-of-use' onClick={props.closeModal}>
              правилами пользования
            </a>
            сайтом, на&nbsp;обработку персональных данных и&nbsp;на&nbsp;получение почтовых уведомлений.
          </p>
        </div>
      </div>
      <form class='col-sm-6 auth'>
        <div class='auth__inner'>
          <h4>{titles[props.mode]}</h4>

          <div class='auth-subtitle'>
            <Show
              when={props.mode === 'forget'}
              fallback={
                <Show when={props.mode === 'reset'}>
                  Введите код из письма или пройдите по ссылке в письме для подтверждения регистрации
                </Show>
              }
            >
              Ничего страшного, просто укажите свою почту, чтобы получить ссылку для сброса пароля.
            </Show>
          </div>
          <div class='auth-info'>
            <For each={state.notifications}>{(n) => <span class='info'>{n}.&nbsp;</span>}</For>
            <For each={state.warnings}>{(w) => <span class='warn'>{w}.&nbsp;</span>}</For>
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
            <button class='submitbtn' disabled={state.handshaking} onClick={() => auth(props.mode)}>
              {state.handshaking ? '...' : titles[props.mode]}
            </button>
          </div>

          <Show when={props.mode === 'sign-in'}>
            <div class='auth-actions'>
              <a href={'#auth'} onClick={() => (mode = 'forget')}>
                Забыли пароль?
              </a>
            </div>
          </Show>

          <Show when={props.mode !== 'forget' && props.mode !== 'reset'}>
            <div class='social-provider'>
              <div class='providers-text'>
                <Show
                  when={props.mode === 'sign-up'}
                  fallback={<Show when={props.mode === 'sign-in'}>Или войдите через соцсети</Show>}
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
            <div classList={{ show: props.mode === 'sign-up' }}>
              <span class='auth-link' onClick={() => (mode = 'sign-in')}>
                У&nbsp;меня есть аккаунт
              </span>
            </div>
            <div classList={{ show: props.mode === 'sign-in' }}>
              <span class='auth-link' onClick={() => (mode = 'sign-up')}>
                У&nbsp;меня еще нет аккаунта
              </span>
            </div>
            <div classList={{ show: props.mode === 'forget' }}>
              <span class='auth-link' onClick={() => (mode = 'sign-in')}>
                Я знаю пароль
              </span>
            </div>
            <div classList={{ show: props.mode === 'reset' }}>
              <span class='auth-link' onClick={() => auth('resend')}>
                Отправить код повторно
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
