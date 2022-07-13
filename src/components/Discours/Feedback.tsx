import { useI18n } from '@solid-primitives/i18n'
import { useStore } from '../../context'

export default () => {
  const action = '/user/feedback'
  const method = 'post'
  let msgElement: HTMLTextAreaElement | undefined
  let contactElement: HTMLInputElement | undefined
  const [t] = useI18n()
  const [, { hideModal }] = useStore()
  const submit = async () => {
    await fetch(action, {
      method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ contact: contactElement?.value, message: msgElement?.innerText })
    })
    hideModal()
  }

  return (
    <form method={method} action={action}>
      <input type='text' name='contact' placeholder='email' ref={contactElement} />
      <textarea cols='12' name='message' rows='3' placeholder={t('Write to us')} ref={msgElement} />
      <input type='submit' onClick={submit} />
    </form>
  )
}
