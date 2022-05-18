import { For } from 'solid-js'
import './Footer.scss'
import Icon from '../Nav/Icon'

const FOOTER_LINKS = [
  {
    header: 'О дискурсе',
    items: [
      {
        title: 'Манифест',
        slug: '/about/manifest'
      },
      {
        title: 'Как устроен Дискурс',
        slug: '/about/guide'
      },
      {
        title: 'База знаний',
        slug: 'https://discours.io/knowledge-base'
      },
      {
        title: 'Правила сообщества',
        slug: '/about/terms-of-use'
      },
      {
        title: 'Как написать статью',
        slug: '/how-to-write-a-good-article'
      }
    ]
  },

  {
    header: 'Участвовать',
    items: [
      {
        title: 'Предложить идею',
        slug: '/#feedback-idea'
      },
      {
        title: 'Стать автором',
        slug: '/create'
      },
      {
        title: 'Поддержать проект',
        slug: '/about/help'
      },
      {
        title: 'Обратная связь',
        slug: '/#feedback'
      },
      {
        title: 'Сотрудничать с Дискурсом',
        slug: 'https://docs.google.com/forms/d/e/1FAIpQLSeNNvIzKlXElJtkPkYiXl-jQjlvsL9u4-kpnoRjz1O8Wo40xQ/viewform'
      }
    ]
  },

  {
    header: 'Разделы',
    items: [
      {
        title: 'Авторы',
        slug: '/user/list'
      },
      {
        title: 'Темы',
        slug: '/topics'
      },
      {
        title: 'Сообщества',
        slug: '/community'
      },
      {
        title: 'Партнёры',
        slug: '/about/partners'
      },
      {
        title: 'Спецпроекты',
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

export default function DiscoursFooter() {
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
            <h5>Подписка</h5>
            <p>Подпишитесь на&nbsp;наши регулярные рассылки.</p>
            [subscribe form here]
          </div>
        </div>

        <div class='footer-copyright row'>
          <div class='col-md-10'>
            Независимый журнал о&nbsp;культуре, науке и&nbsp;обществе с&nbsp;открытой горизонтальной
            редакцией. ©&nbsp;Дискурс 2015-2022.{' '}
            <a href='/about/terms-of-use'>Условия&nbsp;использования</a>
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
