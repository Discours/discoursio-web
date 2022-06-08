import { useI18n } from '@solid-primitives/i18n'
import { createSignal, onMount } from 'solid-js'
import './Subscribe.scss'

export default () => {
  let emailElement: HTMLInputElement | undefined
  const [t] = useI18n()
  const [title, setTitle] = createSignal('')
  const subscribe = async () => {
    setTitle(t('...subscribing'))
    const r = await fetch(`/maillist?email=${emailElement?.value}`)
    setTitle(r.ok ? t('You are subscribed') : t('Subscribe'))
  }
  onMount(() => setTitle(t('Subscribe')))
  return (
    <div class='subscribe-form'>
      <input type='email' name='email' ref={emailElement} placeholder='email' />
      <button onClick={() => emailElement?.value && subscribe()} value={title() as string} />
    </div>
  )
}
