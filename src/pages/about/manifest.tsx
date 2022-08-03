import { Link } from 'solid-app-router'
import Opener from '../../components/Nav/Opener'
import Modal from '../../components/Nav/Modal'
import Feedback from '../../components/Discours/Feedback'
import Subscribe from '../../components/Discours/Subscribe'
import { Title } from 'solid-meta'
import '../../styles/manifest.scss'

export default () => <>
  <Title>Дискурс: Манифест</Title>

  <Modal name='feedback'>
    <Feedback />
  </Modal>
  <Modal name='subscribe'>
    <Subscribe />
  </Modal>

  <article class="container">
    <div class="row">
      <div class="col-md-2">
        <nav class="content-index">
          <ul class="nodash">
            <li><a href="#manifest">Манифест</a></li>
            <li>
              <a href="#participation">Как участвовать в&nbsp;самиздате</a>
              <ul class="nodash">
                <li><a href="#contribute">Предлагать материалы</a></li>
                <li><a href="#donate">Поддерживать проект</a></li>
                <li><a href="#cooperation">Сотрудничать с&nbsp;журналом</a></li>
                <li><a href="#follow">Как еще можно помочь</a></li>
              </ul>
            </li>
            <li>
              <a href="#connection">Будем на&nbsp;связи</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="col-md-8">
        <h1 id="manifest"><span class="wrapped">Манифест</span></h1>

        <div class='col-lg-10 offset-md-1'>
          <p>
            Дискурс - независимый художественно-аналитический журнал с горизонтальной редакцией, основанный на принципах
            свободы слова, прямой демократии и совместного редактирования. Дискурс создаётся открытым медиасообществом
            ученых, журналистов, музыкантов, писателей, предпринимателей, философов, инженеров, художников и
            специалистов со всего мира, объединившихся, чтобы вместе делать общий журнал и объяснять с разных точек
            зрения мозаичную картину современности.
          </p>
          <p>
            Мы пишем о культуре, науке и обществе, рассказываем о новых идеях и современном искусстве, публикуем статьи,
            исследования, репортажи, интервью людей, чью прямую речь стоит услышать, и работы художников из разных
            стран - от фильмов и музыки до живописи и фотографии. Помогая друг другу делать публикации качественнее и
            общим голосованием выбирая лучшие материалы для журнала, мы создаём новую горизонтальную журналистику, чтобы
            честно рассказывать о важном и интересном.
          </p>
          <p>
            Редакция Дискурса открыта для всех: у нас нет цензуры, запретных тем и идеологических рамок. Каждый может
            <Link href='/create'>прислать материал</Link> в журнал и <Link href='/about/guide'>присоединиться к редакции
            </Link>. Предоставляя трибуну для независимой журналистики и художественных проектов, мы помогаем людям рассказывать
            свои истории так, чтобы они были услышаны. Мы убеждены: чем больше голосов будет звучать на Дискурсе, тем громче
            в полифонии мнений будет слышна истина.
          </p>
        </div>

        <h2 class="h2" id="participation">
          <span class="wrapped">Как участвовать в&nbsp;самиздате</span>
        </h2>

        <div class='col-lg-10 offset-md-1'>
          <p>
            Дискурс создается <Link href='/about/guide'>открытым сообществом</Link> энтузиастов новой независимой
            журналистики. Участвовать в открытой редакции и помогать журналу можно следующими способами:
          </p>
          <h3 id="contribute">Предлагать материалы</h3>
          <p>
            <Link href='/create'>Создавайте</Link> свои статьи и художественные работы - лучшие из них будут опубликованы
            в журнале. Дискурс - некоммерческое издание, авторы публикуются в журнале на общественных началах, получая при
            этом <Link href='/create?collab=true'>поддержку</Link> редакции, право голоса, множество других возможностей
            и читателей по всему миру.
          </p>
          <h3 id="donate">Поддерживать проект</h3>
          <p>
            Дискурс существует на пожертвования читателей. Если вам нравится журнал, пожалуйста,
          </p>
          <p>
            <Link href='/about/help'>поддержите</Link> нашу работу. Ваши пожертвования пойдут на выпуск новых материалов,
            оплату серверов, труда программистов, дизайнеров и редакторов.
          </p>
          <h3 id="cooperation">Сотрудничать с журналом</h3>
          <p>
            Мы всегда открыты для сотрудничества и рады единомышленникам. Если вы хотите помогать журналу с редактурой,
            корректурой, иллюстрациями, переводами, версткой, подкастами, мероприятиями, фандрайзингом или как-то ещё -
            скорее пишите нам на <a href="mailto:welcome@discours.io">welcome@discours.io</a>.
          </p><p>
            Если вы представляете некоммерческую организацию и хотите сделать с нами совместный проект, получить
            информационную поддержку или предложить другую форму сотрудничества - [пишите](mailto:welcome@discours.io).
          </p><p>
            Если вы разработчик и хотите помогать с развитием сайта Дискурса,
            <a href="mailto:services@discours.io">присоединяйтесь к IT-команде самиздата</a>. Открытый код платформы для независимой
            журналистики, а также всех наших спецпроектов и медиаинструментов находится
            <a href="https://github.com/Discours">в свободном доступе на GitHub</a>.
          </p>
          <h3 id="follow">Как еще можно помочь</h3>
          <p>
            Советуйте Дискурс друзьям и знакомым. Обсуждайте и распространяйте наши публикации — все материалы открытой
            редакции можно читать и перепечатывать бесплатно. Подпишитесь на самиздат
            <a href="https://vk.com/discoursio">ВКонтакте</a>, в <a href="https://facebook.com/discoursio">Фейсбуке</a> и в
            <a href="https://t.me/discoursio">Телеграме</a>, а также на <Opener name='subscribe'>рассылку лучших
              материалов</Opener> , чтобы не пропустить ничего интересного.
          </p><p>
            <a href="https://forms.gle/9UnHBAz9Q3tjH5dAA">Рассказывайте о впечатлениях</a> от материалов открытой редакции,
            <Opener name='feedback'>делитесь идеями</Opener>, интересными темами, о которых хотели бы узнать больше, и
            историями, которые нужно рассказать.
          </p>
        </div>

        <h2 class="h2" id="connection">
          <span class="wrapped">Будем на&nbsp;связи</span>
        </h2>

        <div class='col-lg-10 offset-md-1'>
          Если вы хотите предложить материал, сотрудничать, рассказать о проблеме, которую нужно осветить, сообщить об ошибке
          или баге, что-то обсудить, уточнить или посоветовать, пожалуйста, <Opener name='feedback'>напишите нам здесь</Opener>
          или на почту <a href="mailto:welcome@discours.io">welcome@discours.io</a>. Мы обязательно ответим и постараемся реализовать
          все хорошие задумки.
        </div>
      </div>
    </div>
  </article>
</>