import { useI18n } from '@solid-primitives/i18n'
import { createSignal } from 'solid-js'

export default () => {
  let emailElement: HTMLInputElement | undefined
  const [t] = useI18n()
  const [title, setTitle] = createSignal(t('Subscribe'))
  const [email, setEmail] = createSignal('')
  const subscribe = async () => {
    setTitle(t('...subscribing'))
    setEmail(emailElement?.value || '')
    const r = await fetch(`/api/maillist?email=${email()}`)
    setTitle(r.ok ? t('You are subscribed') : t('Subscribe'))
  }

  return (
    <div class='subscribe-form'>
      <input type='email' name='email' value={email()} ref={emailElement} placeholder='email' />
      <a href='#subscribe' onClick={() => email() && subscribe()}>
        {title()}
      </a>
    </div>
  )
}
