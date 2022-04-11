import { Show, createSignal, onMount } from 'solid-js'
import { useStore } from '../../store'
import Userpic from '../Author/Userpic'
import Icon from './Icon'
import './Private.scss'

export default () => {
  const [{ token, session }] = useStore()
  const [resource, setResource] = createSignal()

  onMount(async () => {
    setResource(window.location.pathname)
    console.log(`navauth: mounting on ${resource()}`)
  })

  return (
    <Show when={token}>
      <div class='usercontrol col'>
        <div class='usercontrol__item usercontrol__item--write-post'>
          <a href='/create'>
            <span class='text-label'>опубликовать материал</span>
            <Icon name='pencil' />
          </a>
        </div>
        <div class='usercontrol__item usercontrol__item--search'>
          <a href='/search'>
            <Icon name='search' />
          </a>
        </div>
        <div class='usercontrol__item usercontrol__item--inbox'>
          <a href='/user/inbox'>
            <div classList={{ entered: resource() === '/user/inbox' }}>
              <Icon name='inbox-white' counter={0 /* TODO: session?.messages?.length */} />
            </div>
          </a>
        </div>
        <div class='usercontrol__item'>
          <a href='/user'>
            <div classList={{ entered: resource() === '/user' }}>
              <Userpic user={session} />
            </div>
          </a>
        </div>
      </div>
    </Show>
  )
}
