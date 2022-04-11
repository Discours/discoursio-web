import { createSignal } from 'solid-js'
let emailElement: HTMLInputElement

export default () => {
  const [title, setTitle] = createSignal('Подписаться')
  const [email, setEmail] = createSignal('')
  const subscribe = async () => {
    setTitle('...подписываем')
    setEmail(emailElement.value)
    const r = await fetch(`/api/maillist?email=${email()}`)

    setTitle(r.ok ? 'Вы подписаны!' : 'Подписаться')
  }

  return (
    <div class='subscribe-form'>
      <input type='email' name='email' value={email()} ref={emailElement} placeholder='ваш email' />
      <a href='#subscribe' onClick={() => email() && subscribe()}>
        {title()}
      </a>
    </div>
  )
}
