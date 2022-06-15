import { Link, NavLink } from 'solid-app-router'
import { createSignal, onMount } from 'solid-js'
import { User } from '../../graphql/types.gen'
import { useAuth } from '../../store/auth'
import Userpic from '../Author/Userpic'
import Icon from './Icon'
import './Private.scss'

export default () => {
  const [{ session, info }] = useAuth()
  const [resource, setResource] = createSignal('')

  onMount(async () => {
    setResource(window.location.pathname)
    console.log(`[private] mounting on ${resource()}`)
  })

  return (
    <div class='usercontrol col'>
      <div class='usercontrol__item usercontrol__item--write-post'>
        <a href='/create'>
          <span class='text-label'>опубликовать материал</span>
          <Icon name='pencil' />
        </a>
      </div>
      <div class='usercontrol__item usercontrol__item--search'>
        <NavLink href='/search'>
          <Icon name='search' />
        </NavLink>
      </div>
      <div class='usercontrol__item usercontrol__item--inbox'>
        <a href='/inbox'>
          <div classList={{ entered: resource() === '/inbox' }}>
            <Icon name='inbox-white' counter={info?.totalUnreadMessages} />
          </div>
        </a>
      </div>
      <div class='usercontrol__item'>
        <Link href={`/${session?.slug}`}>
          <div classList={{ entered: resource() === `/${session?.slug}` }}>
            <Userpic user={session as Partial<User>} />
          </div>
        </Link>
      </div>
    </div>
  )
}
