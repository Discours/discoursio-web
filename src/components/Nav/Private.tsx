import { Show, createSignal, onMount } from 'solid-js'
import { useStore } from '~/store'
import Userpic from '../Author/Userpic'
import Icon from './Icon'
import './Private.scss'
export default () => {
  const store = useStore()
  const { token, currentUser } = store[0]
  const { getSession } = store[1]
  const [resource, setResource] = createSignal()

  onMount(async () => {
    setResource(window.location.pathname)
    console.log(`navauth: mounting on ${resource()}`)
    const handleToken = async () => {
      console.log(`navauth: found auth token ${token}`)
      const { user, error } = getSession(token)

      if (error) console.error(error) // TODO: session expired notification

      if (user) console.log('navauth: got session')
    }

    if (token()) await handleToken()
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
              <Icon name='inbox-white' counter={currentUser.messages?.length} />
            </div>
          </a>
        </div>
        <div class='usercontrol__item'>
          <a href='/user'>
            <div classList={{ entered: resource() === '/user' }}>
              <Userpic user={currentUser} />
            </div>
          </a>
        </div>
      </div>
    </Show>
  )
}
