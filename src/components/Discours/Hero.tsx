import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { useStore } from '../../context'
import './Hero.scss'

export default () => {
  const [, { showModal }] = useStore()
  const [t] = useI18n()
  return (
    <div class='about-discours'>
      <div class='wide-container row'>
        <div class='col-lg-10 offset-lg-1 col-xl-8 offset-xl-2'>
          <h4>{t('Horizontal collaborative journalistic platform')}</h4>
          <p>
            {t('Discours is an intellectual environment, a web space and tools that allows authors to collaborate with readers and come together to co-create publications and media projects')}.
            <br />
            <em>
              {t('We are convinced that one voice is good, but many is better. We create the most amazing stories together')}.
            </em>
          </p>
          <div class='about-discours__actions'>
            <a class='button' onClick={() => showModal('auth')}>
              {t('Join the community')}
            </a>
            <NavLink class='button' href='/create'>
              {t('Become an author')}
            </NavLink>
            <NavLink class='button' href='/about/manifest'>
              {t('About the project')}
            </NavLink>
            <NavLink class='button' href='/about/help'>
              {t('Support us')}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
