import { useStore } from '../../store'
import { useI18n } from '@solid-primitives/i18n'
import { Link } from 'solid-app-router'
import { For } from 'solid-js/web'
import AuthorCard from '../Author/Card'
import { User } from '../../graphql/types.gen'

export default () => {
  const [t] = useI18n()
  const [{ session }, { signOut, hideModal }] = useStore()

  const quit = () => {
    signOut()
    hideModal()
  }
  // TODO: ProfileModal markup and styles
  return (
    <div class='row view profile'>
      <h1>{session?.username}</h1>
      <AuthorCard author={session as Partial<User>} />
      <div class='profile-bio'>{session?.bio}</div>
      <For each={session?.links}>
        {(l) => (<Link href={l || ''} />)}
      </For>
      <span onClick={quit}>{t('Quit')}</span>
    </div>
  )
}
