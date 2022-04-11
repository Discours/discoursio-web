import { For, Show } from 'solid-js/web'
import Icon from './Icon'
import { useAuth } from '../../store/auth'
import { useCommon, Warning } from '../../store/common'

interface ProfileProps {
  [key: string]: any
}

export default (props: ProfileProps) => {
  const [{ session }, { signOut }] = useAuth()
  const [, { hideModal }] = useCommon()

  const quit = () => {
    signOut()
    hideModal()
  }
  // TODO: ProfileModal markup and styles
  return (
    <div class='row view profile'>
      <span onClick={() => quit()}>Выйти</span>
      <h1>{session?.username}</h1>
    </div>
  )
}
