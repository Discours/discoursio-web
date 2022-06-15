import { For, Show, createSignal, onMount, createMemo } from 'solid-js'
import { Link, NavLink } from 'solid-app-router'
import './Header.scss'
import { useStore } from '../../store'
import { useAuth } from '../../store/auth'
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
  const [authState,] = useAuth()
  const [{ warnings }, { showModal }] = useStore()
  const [visibleWarnings, setVisibleWarnings] = createSignal(false)
  const toggleWarnings = () => setVisibleWarnings(!visibleWarnings())
  onMount(() => {
    setResource(window.location.pathname)
    setFixed(document.body.classList.contains('fixed'))
  })

  const rrr = createMemo(() => [
    { name: t('zine'), href: '/' },
    { name: t('feed'), href: '/feed' },
    { name: t('topics'), href: '/topics' }
  ])
  const openModal = (evt: Event) => {
    evt.preventDefault()
    setFixed(false)
    showModal('auth')
  }
  const routeModal = (r: { name: string; href: string }) => {
    setResource(r.href)
    setFixed(false)
    document.body.classList.remove('fixed')
  }
  const toggleBurger = () => {
    setFixed(!fixed())
    document.body.classList.toggle('fixed')
  }
  return (
    <header>
      <Modal name='auth'>
        <AuthModal />
      </Modal>
      <div class='wide-container'>
        <nav class='row header__inner' classList={{ fixed: fixed() }}>
          <div class='main-logo col-auto'>
            <NavLink href='/'>
              <img src='/logo.svg' alt={t('Discours')} />
            </NavLink>
          </div>
          <ul class='col main-navigation text-xl inline-flex' classList={{ fixed: fixed() }}>
            <For each={rrr()}>
              {(r: { href: string; name: string }) => (
                <li classList={{ selected: resource() === r.href }}>
                  <NavLink href={r.href} onClick={() => routeModal(r)}>
                    {r.name}
                  </NavLink>
                </li>
              )}
            </For>
          </ul>
          <div class='usernav'>
            <div class='usercontrol col'>
              <div class='usercontrol__item'>
                <a href={''} onClick={toggleWarnings}>
                  <div>
                    <Icon name='bell-white' counter={warnings?.length || (authState.authorized ? 1 : 0)} />
                  </div>
                </a>
              </div>

              <Show when={visibleWarnings()}>
                <div class='usercontrol__item notifications'>
                  <Notifications />
                </div>
              </Show>
              
              <Show
                when={authState?.authorized}
                fallback={
                  <div class='usercontrol__item loginbtn'>
                    <Link href='#' onClick={openModal}>
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
            <div class='burger' classList={{ fixed: fixed() }} onClick={toggleBurger}>
              <div />
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
