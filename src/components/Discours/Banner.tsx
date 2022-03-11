import { createSignal } from 'solid-js'
import './Banner.scss'
export default () => {
  const [modal, setModal] = createSignal()

  return (
    <div class='discours-banner'>
      <div class='wide-container row'>
        <div class='discours-banner__content col-md-5'>
          <h3>Дискурс существует благодаря вашему участию</h3>
          <p>
            <a href='/about/help'>Помочь журналу</a>
            <a href='/create'>Стать автором</a>
            <a href='#auth' onClick={() => setModal('auth')}>
              Присоединиться к&nbsp;сообществу
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
