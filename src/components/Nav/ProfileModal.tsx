import { useStore } from '../../store'
import { useI18n } from '@solid-primitives/i18n'

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
      <span onClick={() => quit()}>{t('Quit')}</span>
      <h1>{session?.username}</h1>
    </div>
  )
}
