import { For } from 'solid-js'
import './Footer.scss'
import Icon from '../Nav/Icon'
import { useI18n } from '@solid-primitives/i18n'
import Subscribe from './Subscribe'

export default function DiscoursFooter() {
  const [t] = useI18n()
  const FOOTER_LINKS = [
    {
      header: 'About the project',
      items: [
        {
          title: 'Manifest',
          slug: '/about/manifest'
        },
        {
          title: 'How it works',
          slug: '/about/guide'
        },
        {
          title: 'Knowledge base',
          slug: 'https://discours.io/knowledge-base'
        },
        {
          title: 'Terms of use',
          slug: '/about/terms-of-use'
        },
        {
          title: 'How to write an article',
          slug: '/how-to-write-a-good-article'
        }
      ]
    },

    {
      header: 'Participating',
      items: [
        {
          title: 'Suggest an idea',
          slug: '/#feedback-idea'
        },
        {
          title: 'Become an author',
          slug: '/create'
        },
        {
          title: 'Support us',
          slug: '/about/help'
        },
        {
          title: 'Feedback',
          slug: '/#feedback'
        },
        {
          title: 'Work with us',
          slug: 'https://docs.google.com/forms/d/e/1FAIpQLSeNNvIzKlXElJtkPkYiXl-jQjlvsL9u4-kpnoRjz1O8Wo40xQ/viewform'
        }
      ]
    },

    {
      header: 'Sections',
      items: [
        {
          title: 'Authors',
          slug: '/authorslist'
        },
        {
          title: 'Topics',
          slug: '/topics'
        },
        {
          title: 'Communities',
          slug: '/community'
        },
        {
          title: 'Partners',
          slug: '/about/partners'
        },
        {
          title: 'Special projects',
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
          <For each={[...FOOTER_LINKS]}>
            {({ header, items }) => (
              <div class='col-md-3'>
                <h5>{t(header)}</h5>
                <ul>
                  <For each={items}>
                    {({ slug, title }) => (
                      <li>
                        {' '}
                        <a href={slug}>{t(title)}</a>{' '}
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
            <Subscribe />
          </div>
        </div>

        <div class='footer-copyright row'>
          <div class='col-md-10'>
            Независимый журнал о культуре, науке и обществе с открытой горизонтальной редакцией. Дискурс ©
            2015 - 2022
            <br />
            <a href='/about/terms-of-use'>{t('Terms of use')}</a>
          </div>
          <div class='footer-copyright__social col-md-2'>
            <For each={[...SOCIAL]}>
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
