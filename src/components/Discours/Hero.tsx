import { useStore } from '../../store'
import './Hero.scss'

export default () => {
  const [, { showModal }] = useStore()

  return (
    <div class='about-discours'>
      <div class='wide-container row'>
        <div class='col-lg-10 offset-lg-1 col-xl-8 offset-xl-2'>
          <h4>Горизонтальная платформа для коллаборативной журналистики</h4>
          <p>
            Дискурс&nbsp;&mdash; это интеллектуальная среда, веб-пространство и&nbsp;инструменты, которые
            позволяют авторам сотрудничать с&nbsp;читателями и&nbsp;объединяться для совместного создания
            публикаций и&nbsp;медиа-проектов.
            <br />
            <em>
              Мы&nbsp;убеждены, один голос хорошо, а&nbsp;много&nbsp;&mdash; лучше. Самые потрясающие
              истории мы&nbsp;создаём вместе.
            </em>
          </p>
          <div class='about-discours__actions'>
            <a class='button' href='#auth' onClick={() => showModal('auth')}>
              присоединитьсяк&nbsp;сообществу
            </a>
            <a class='button' href='/create'>
              стать&nbsp;автором
            </a>
            <a class='button' href='/about/manifest'>
              о&nbsp;проекте
            </a>
            <a class='button' href='/about/help'>
              поддержать&nbsp;платформу
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
