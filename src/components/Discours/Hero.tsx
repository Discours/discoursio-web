import { useI18n } from '@solid-primitives/i18n'
import { NavLink } from 'solid-app-router'
import { useStore } from '../../store'
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
            Дискурс - это интеллектуальная среда, веб-пространство и инструменты, которые позволяют авторам сотрудничать с читателями и объединяться для совместного создания публикаций и медиа-проектов.
            <br />
            <em>
              Мы убеждены, один голос хорошо, а много - лучше. Самые потрясающиe истории мы создаём вместе.
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
