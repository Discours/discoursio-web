import { For, Show, createSignal, onMount } from 'solid-js'
import { Link } from 'solid-app-router'
import './Header.scss'
import { useStore } from '../../store'
import Private from './Private'
import Notifications from './Notifications'
import Icon from './Icon'

const routes = [
  { name: 'журнал', href: '/' },
  { name: 'лента', href: '/feed' },
  { name: 'темы', href: '/topic' }
]

export default () => {
  const [modal, setModal] = createSignal('')
  const [fixed, setFixed] = createSignal(false)
  const [token, setToken] = createSignal('')
  const [showNotices, setShowNotices] = createSignal(false)
  const [resource, setResource] = createSignal()
  const state = (useStore() || [null])[0]

  onMount(() => {
    setFixed(document.body.classList.contains('fixed'))
    setToken(localStorage.getItem('token'))
    setResource(window.location.pathname)
  })

  return (
    <header>
      <Notifications />
      <div class='wide-container'>
        <nav class='row header__inner' classList={{ fixed: fixed() }}>
          <div class='main-logo col-auto'>
            <a href='/'>
              <img src='/logo.svg' alt='Дискурс' />
            </a>
          </div>
          <ul class='col main-navigation text-xl inline-flex' classList={{ fixed: fixed() }}>
            <For each={routes}>
              {({ href, name }) => (
                <li classList={{ selected: resource() === href }}>
                  <Link
                    href={href}
                    onClick={() => {
                      setFixed(false)
                      document.body.classList.remove('fixed')
                    }}
                  >
                    {name}
                  </Link>
                </li>
              )}
            </For>
          </ul>
          <div class='usernav'>
            <div class='usercontrol col'>
              <div class='usercontrol__item'>
                <a href={''} onClick={() => setShowNotices(!showNotices())}>
                  <div>
                    <Icon name='bell-white' counter={state?.notifications.length} />
                  </div>
                </a>
              </div>
              <div class='usercontrol__item notifications'>
                <Notifications />
              </div>
              <Show
                when={state?.currentUser}
                fallback={
                  <div class='usercontrol__item loginbtn'>
                    <a href={'#auth'} onClick={() => setModal('auth')}>
                      войти
                    </a>
                  </div>
                }
              >
                <Private />
              </Show>
            </div>
          </div>
          <div class='burger-container'>
            <div
              class='burger'
              classList={{ fixed: fixed() }}
              onClick={() => {
                setFixed(!fixed())
                document.body.classList.toggle('fixed')
              }}
            >
              <div />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
