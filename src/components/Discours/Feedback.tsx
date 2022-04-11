import { useStore } from '../../store'

const action = '/user/feedback'
const method = 'post'
let msgElement: HTMLTextAreaElement
let contactElement: HTMLInputElement

export default () => {
  const [, { hideModal }] = useStore()
  const submit = async () => {
    await fetch(action, {
      method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({ contact: contactElement.value, message: msgElement.innerText })
    })
    hideModal()
  }

  return (
    <form method={method} action={action}>
      <input type='text' name='contact' placeholder='Ваш контакт' ref={contactElement} />
      <textarea cols='12' name='message' rows='3' placeholder='Напишите нам' ref={msgElement} />
      <input type='submit' onClick={submit} />
    </form>
  )
}
