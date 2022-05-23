import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { useStore } from '../../store'
import './Banner.scss'

export default () => {
  const [t] = useI18n()
  const [, {showModal}] = useStore()
  return (
    <div class='discours-banner'>
      <div class='wide-container row'>
        <div class='discours-banner__content col-md-5'>
          <h3>{t('Discours is created with our common effort')}</h3>
          <p>
            <NavLink href='/about/help'>{t('Support us')}</NavLink>
            <NavLink href='/create'>{t('Become an author')}</NavLink>
            <a href={''} onClick={() => showModal('auth')}>
              {t('Join the community')}
            </a>
          </p>
        </div>
        <div class='col-md-6 offset-md-1 discours-banner__image'>
          <img src='/discours-banner.jpg' alt='Дискурс' />
        </div>
      </div>
    </div>
  )
}
