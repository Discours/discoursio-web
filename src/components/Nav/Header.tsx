import { For, Show, createSignal, onMount, createMemo } from 'solid-js'
import { NavLink } from 'solid-app-router'
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
  const [, { showModal, clearWarns, getWarns }] = useStore()
  const [visibleWarnings, setVisibleWarnings] = createSignal(false)
  const toggleWarnings = () => setVisibleWarnings(!visibleWarnings())
  onMount(() => {
    setResource(window.location.pathname)
    setFixed(document.body.classList.contains('fixed'))
  })
  const rrr = createMemo(() => [
    { name: t('zine'), href: '/' },
    { name: t('feed'), href: '/feed' },
    { name: t('topics'), href: '/topics' },
    //{ name: t('community'), href: '/community' }
  ])
  const openModal = (evt: Event) => {
    clearWarns()
    evt.preventDefault()
    setFixed(false)
    showModal('auth')
  }
  const navigate = (r: { name: string; href: string }) => {
    setResource(r.href)
    setFixed(false)
    document.body.classList.remove('fixed')
  }
  const toggleBurger = () => {
    setFixed(!fixed())
    document.body.classList.toggle('fixed')
  }
  const authorized = createMemo(() => authState?.authorized)
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
                  <NavLink href={r.href} onClick={() => navigate(r)}>
                    {r.name}
                  </NavLink>
                </li>
              )}
            </For>
            <Show when={authState.authorized}>
              <li classList={{ selected: resource() === '/community' }}>
                <NavLink href={'/community'} onClick={() => navigate({ name: t('community'), href: '/community'})}>
                  {t('community')}
                </NavLink>
              </li>
            </Show>
          </ul>
          <div class='usernav'>
            <div class='usercontrol col'>
              <div class='usercontrol__item'>
                <a href='#auth' onClick={authState.authorized ? toggleWarnings : openModal}>
                  <div>
                    <Icon name='bell-white' counter={authState.authorized ? getWarns().length : 1} />
                  </div>
                </a>
              </div>

              <Show when={visibleWarnings()}>
                <div class='usercontrol__item notifications'>
                  <Notifications />
                </div>
              </Show>
              
              <Show
                when={authorized()}
                fallback={
                  <div class='usercontrol__item loginbtn'>
                    <a href='#auth' onClick={openModal}>
                      {t('enter')}
                    </a>
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
