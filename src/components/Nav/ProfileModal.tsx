import { useI18n } from '@solid-primitives/i18n'
import { Link } from 'solid-app-router'
import { For } from 'solid-js/web'
import AuthorCard from '../Author/Card'
import { User } from '../../graphql/types.gen'
import { useStore } from '../../store'
import { useAuth } from '../../store/auth'

export default () => {
  const [t] = useI18n()
  const [{ user }, { signOut }] = useAuth()
  const [, { hideModal }] = useStore()

  const quit = () => {
    signOut()
    hideModal()
  }
  // TODO: ProfileModal markup and styles
  return (
    <div class='row view profile'>
      <h1>{user?.username}</h1>
      <AuthorCard author={user as Partial<User>} />
      <div class='profile-bio'>{user?.bio}</div>
      <For each={user?.links}>{(l) => <Link href={l || ''} />}</For>
      <span onClick={quit}>{t('Quit')}</span>
    </div>
  )
}
