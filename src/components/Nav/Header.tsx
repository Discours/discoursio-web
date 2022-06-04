import { For, Show, createSignal, onMount, createMemo } from 'solid-js'
import { Link, NavLink } from 'solid-app-router'
import './Header.scss'
import { useStore } from '../../store'
import Private from './Private'
import Notifications from './Notifications'
import Icon from './Icon'
import Modal from './Modal'
import AuthModal from './AuthModal'
import { useI18n } from '@solid-primitives/i18n'

export default () => {
  const [t] = useI18n()
  const [fixed, setFixed] = createSignal(false)
  const [resource, setResource] = createSignal()
  const [state, actions] = useStore()

  onMount(() => {
    setResource(window.location.pathname)
    setFixed(document.body.classList.contains('fixed'))
  })

  const rrr = createMemo(() => ([
    { name: t('zine'), href: '/' },
    { name: t('feed'), href: '/feed' },
    { name: t('topics'), href: '/topics' }
  ]))

  return (
    <header>
      <Modal name='auth'>
        <AuthModal />
      </Modal>
      <Notifications />
      <div class='wide-container'>
        <nav class='row header__inner' classList={{ fixed: fixed() }}>
          <div class='main-logo col-auto'>
            <NavLink href='/'>
              <img src='/logo.svg' alt={t('Discours')} />
            </NavLink>
          </div>
          <ul class='col main-navigation text-xl inline-flex' classList={{ fixed: fixed() }}>
            <For each={rrr()}>
              {(r: { href:string; name:string; }) => (
                <li classList={{ selected: resource() === r.href }}>
                  <NavLink
                    href={r.href}
                    onClick={() => {
                      setResource(r.href)
                      setFixed(false)
                      document.body.classList.remove('fixed')
                    }}
                  >
                    {r.name}
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
          <div class='usernav'>
            <div class='usercontrol col'>
              <div class='usercontrol__item'>
                <a href={''} onClick={() => actions.toggleWarnings()}>
                  <div>
                    <Icon name='bell-white' counter={state.warnings?.length || 1} />
                  </div>
                </a>
              </div>
              <div class='usercontrol__item notifications'>
                <Notifications />
              </div>
              <Show
                when={actions.authorized()}
                fallback={
                  <div class='usercontrol__item loginbtn'>
                    <Link
                      href='#'
                      onClick={(evt) => {
                        evt.preventDefault()
                        setFixed(false)
                        actions.showModal('auth')
                      }}
                    >
                      {t('enter')}
                    </Link>
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