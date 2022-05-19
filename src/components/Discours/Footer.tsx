import { For } from 'solid-js'
import './Footer.scss'
import Icon from '../Nav/Icon'
import { useI18n } from '@solid-primitives/i18n'

export default function DiscoursFooter() {
  const [t] = useI18n()
  const FOOTER_LINKS = [
    {
      header: t('About the project'),
      items: [
        {
          title: t('Manifest'),
          slug: '/about/manifest'
        },
        {
          title: t('How it works'),
          slug: '/about/guide'
        },
        {
          title: t('Knowledge base'),
          slug: 'https://discours.io/knowledge-base'
        },
        {
          title: t('Terms of use'),
          slug: '/about/terms-of-use'
        },
        {
          title: t('How to write an article'),
          slug: '/how-to-write-a-good-article'
        }
      ]
    },
  
    {
      header: t('Participating'),
      items: [
        {
          title: t('Suggest an idea'),
          slug: '/#feedback-idea'
        },
        {
          title: t('Become an author'),
          slug: '/create'
        },
        {
          title: t('Support us'),
          slug: '/about/help'
        },
        {
          title: t('Feedback'),
          slug: '/#feedback'
        },
        {
          title: t('Work with us'),
          slug: 'https://docs.google.com/forms/d/e/1FAIpQLSeNNvIzKlXElJtkPkYiXl-jQjlvsL9u4-kpnoRjz1O8Wo40xQ/viewform'
        }
      ]
    },
  
    {
      header: t('Sections'),
      items: [
        {
          title: t('Authors'),
          slug: '/user/list'
        },
        {
          title: t('Topics'),
          slug: '/topics'
        },
        {
          title: t('Communities'),
          slug: '/community'
        },
        {
          title: t('Partners'),
          slug: '/about/partners'
        },
        {
          title: t('Special projects'),
          slug: '/about/projects'
        }
      ]
    }
  ]
  
  const SOCIAL = [
    {
      name: 'facebook',
      href: 'https://facebook.com/discoursio'
    },
    {
      name: 'vk',
      href: 'https://vk.com/discoursio'
    },
    {
      name: 'twitter',
      href: 'https://twitter.com/discours_io'
    },
    {
      name: 'telegram',
      href: 'https://t.me/discoursio'
    }
  ]
  return (
    <footer class='discours-footer'>
      <div class='wide-container'>
        <div class='row'>
          <For each={FOOTER_LINKS}>
            {({ header, items }) => (
              <div class='col-md-3'>
                <h5>{header}</h5>
                <ul>
                  <For each={items}>
                    {({ slug, title }) => (
                      <li>
                        {' '}
                        <a href={slug}>{title}</a>{' '}
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
          <div class='col-md-3'>
            <h5>{t('Subscription')}</h5>
            <p>{t('Join our maillist')}</p>
            [subscribe form here]
          </div>
        </div>

        <div class='footer-copyright row'>
          <div class='col-md-10'>
            {t('The independent journal about culture, science, and society with an open, horizontal editorial board.')} ©&nbsp;Дискурс 2015-2022.{' '}
            <a href='/about/terms-of-use'>{t('Terms of use')}</a>
          </div>
          <div class='footer-copyright__social col-md-2'>
            <For each={SOCIAL}>
              {(social) => (
                <div class={`social__item social__item--${social.name}`}>
                  <a href={social.href}>
                    <Icon name={`${social.name}-white`} />
                  </a>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </footer>
  )
}
