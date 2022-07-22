import { Title, Meta } from 'solid-meta'
import '../../styles/manifest.scss'

export default () => {
  return (
    <>
      <Title>Правила сайта</Title>

      <Meta name='description' content='Правила журнала Дискурс' />
      <Meta name='keywords' content='Discours.io, правила сайта, terms of use' />
      <Meta property='og:title' content='Правила сайта' />
      <Meta property='og:description' content='Правила журнала Дискурс' />

      <article class='container'>
        <div class='row'>
          <div class="col-md-2">
            <nav class="content-index">
              <ul class="nodash">
                <li><a href="#terms-of-use">Пользовательское соглашение</a></li>
                <li>
                  <a href="#definitions">Определения</a>
                </li>
                <li>
                  <a href="#copyright">Авторские права</a>
                </li>
                <li>
                  <a href="#rules">Правила поведения</a>
                </li>
                <li>
                  <a href="#privacy-policy">Политика конфиденциальности</a>
                </li>
                <li>
                  <a href="#feedback">Обратная связь</a>
                </li>
              </ul>
            </nav>
          </div>

          <div class='col-md-8'>
            <h1 id="terms-of-use">
              <span class='wrapped'>Пользовательское соглашение</span>
            </h1>

            <div class='col-lg-10 offset-md-1'>
              <p>
                Дискурс&nbsp;&mdash; это сообщество творческих людей, объединенных идеей делать интересный
                журнал для всех желающих. Авторы Дискурса сообща посредством прямого голосования определяют
                содержание журнала.
              </p>
              <p>Для того, чтобы Дискурс работал без помех, разработаны настоящие Правила.</p>
              <h3 id='definitions'>Определения</h3>
              <p>
                <strong>Сайт</strong>&nbsp;&mdash; портал discours.io
              </p>
              <p>
                <strong>Пользователь</strong>&nbsp;&mdash; лицо, пользующееся Сайтом, либо юридическое лицо,
                обладающее правами на&nbsp;интеллектуальную собственность.
              </p>
              <p>
                <strong>Публикация контента</strong>&nbsp;&mdash; размещение Пользователем посредством Сайта
                объектов авторских прав и&nbsp;другой информации для других пользователей.
              </p>
              <p>
                <strong>Издательство</strong>&nbsp;&mdash; администрация сайта, которая занимается технической
                и&nbsp;издательской деятельностью для обеспечения функционирования Сайта и&nbsp;Альманаха.
                Издательство не&nbsp;вмешивается в&nbsp;принятие редакционных решений авторским сообществом.
              </p>
              <p>
                <strong>Альманах &laquo;Дискурс&raquo;</strong> (свидетельство о&nbsp;регистрации СМИ: ПИ
                &#8470; ФС77-63947 от&nbsp;18.12.15)&nbsp;&mdash; печатное периодическое издание, которое
                выходит раз в&nbsp;год и&nbsp;состоит из&nbsp;лучших публикаций на&nbsp;Сайте за&nbsp;это
                время.
              </p>
              <h3 id='copyright'>Авторские права</h3>
              <ol>
                <li>
                  <p>
                    Вся информация на&nbsp;сайте (включая тексты, изображения, видеоматериалы, аудиозаписи,
                    программный код, дизайн сайта и&nbsp;т.д.) является объектом интеллектуальной
                    собственности ее&nbsp;правообладателей и&nbsp;охраняется законодательством РФ.
                  </p>
                </li>
                <li>
                  <p>
                    Публикуя контент на&nbsp;сайте, Пользователь на&nbsp;безвозмездной основе предоставляет
                    Издательству право на&nbsp;воспроизведение, распространение, перевод, редактирование
                    контента. Данное право предоставляется Издательству на&nbsp;весь срок действия авторских
                    прав Пользователя.
                  </p>
                </li>
                <li>
                  <p>
                    Пользователь предоставляет Издательству право редактировать контент, в&nbsp;том числе
                    вносить в&nbsp;него изменения, сокращения и&nbsp;дополнения, снабжать его иллюстрациями
                    и&nbsp;пояснениями, исправлять ошибки и&nbsp;уточнять фактические сведения, при условии,
                    что этим не&nbsp;искажается авторский замысел.
                  </p>
                </li>
                <li>
                  <p class='ng-binding'>
                    Обнародование контента осуществляется Издательством в&nbsp;соответствии с&nbsp;условиями
                    лицензии{' '}
                    <a href='https://creativecommons.org/licenses/by-nc-nd/4.0/deed.ru' target='_blank'>
                      Creative Commons BY-NC-ND 4.0
                    </a>
                    . Все материалы сайта предназначены исключительно для личного некоммерческого
                    использования. Права на&nbsp;дизайн и&nbsp;программный код сайта принадлежат Издательству.
                  </p>
                </li>
                <li>
                  <p class='ng-binding'>
                    Все аудиовизуальные произведения являются собственностью своих авторов
                    и&nbsp;правообладателей и&nbsp;используются только в&nbsp;образовательных
                    и&nbsp;информационных целях. Если вы&nbsp;являетесь собственником того или иного
                    произведения и&nbsp;не&nbsp;согласны с&nbsp;его размещением на&nbsp;сайте, пожалуйста,
                    напишите на&nbsp;
                    <a href='mailto:welcome@discours.io' target='_blank'>
                      welcome@discours.io
                    </a>
                    .
                  </p>
                </li>
                <li>
                  <p>
                    Цитирование, распространение, доведение до&nbsp;всеобщего сведения материалов Cайта
                    приветствуется. При использовании материалов сайта необходимо указать имя автора
                    и&nbsp;активную ссылку на&nbsp;материал на&nbsp;Сайте.
                  </p>
                </li>
              </ol>
              <h3 id='rules'>Правила поведения</h3>
              <ol>
                <li>
                  <p>
                    Находясь на&nbsp;Сайте, Пользователь подтверждает свое совершеннолетие, правоспособность,
                    а&nbsp;также согласие с&nbsp;настоящими Правилами и&nbsp;политикой конфиденциальности
                    и&nbsp;готовность нести полную ответственность за&nbsp;их соблюдение.
                  </p>
                </li>
                <li>
                  <h4>На&nbsp;сайте запрещено:</h4>
                  <ul>
                    <li>
                      Публиковать контент, авторские права на&nbsp;который принадлежат третьим лицам, без
                      согласия этих лиц. Если авторские права на контент принадлежат нескольким лицам,
                      то&nbsp;его публикация предполагает согласие их&nbsp;всех.
                    </li>
                    <li>Размещать коммерческую и&nbsp;политическую рекламу.</li>
                    <li>
                      Целенаправленно препятствовать нормальному функционированию сообщества и&nbsp;сайта
                      discours.io
                    </li>
                    <li>Выдавать себя за&nbsp;другого человека и&nbsp;представляться его именем.</li>
                    <li>
                      Размещать информацию, которая не&nbsp;соответствует целям создания Сайта, ущемляет
                      интересы других пользователей или третьих лиц, нарушает законы Российской Федерации.
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    Пользователь несет всю ответственность за&nbsp;содержание публикуемого контента
                    и&nbsp;свое взаимодействие с&nbsp;другими пользователями, и&nbsp;обязуется возместить все
                    расходы в&nbsp;случае предъявления каких-либо претензий третьими лицами. Издательство
                    не&nbsp;несет ответственности за&nbsp;содержание публикуемой пользователями информации,
                    в&nbsp;том числе за&nbsp;размещенные на&nbsp;сайте комментарии. Переписка между
                    Пользователем и&nbsp;Издательством считается юридически значимой. Настоящие Правила могут
                    быть изменены Издательством, изменения вступают в&nbsp;силу с&nbsp;момента публикации
                    на&nbsp;Сайте.
                  </p>
                </li>
                <li>
                  <p>
                    Если Пользователь очевидно и&nbsp;целенаправленно нарушает правила, Издательство может
                    и&nbsp;принять в&nbsp;отношении автора следующие меры: вынести предупреждение
                    и&nbsp;обязать автора устранить допущенное нарушение, удалить контент, нарушающий правила,
                    заблокировать или удалить аккаунт нарушителя.
                  </p>
                </li>
              </ol>
              <h3 id='privacy-policy'>Политика конфиденциальности</h3>
              <ol>
                <li>
                  <p>Сайт может собирать у&nbsp;пользователей следующие данные:</p>
                  <ul>
                    <li>
                      <p>
                        Данные, которые пользователи сообщают о&nbsp;себе сами при подаче заявки, регистрации,
                        авторизации или заполнения профиля, в&nbsp;том числе ФИО и&nbsp;контактную информацию.
                        Конфиденциальные данные, такие как идентификатор и&nbsp;электронный адрес,
                        используются для идентификации пользователя. Данные профиля, размещённые публично
                        по&nbsp;желанию пользователя, которое выражается фактом их&nbsp;предоставления,
                        используется для демонстрации другим пользователям той информации о&nbsp;себе, которую
                        пользователь готов предоставить.
                      </p>
                    </li>
                    <li>
                      <p>
                        Данные, собранные автоматическим путем, такие, как cookie-файлы. Эти
                        неперсонализированные данные могут использоваться для сбора статистики
                        и&nbsp;улучшения работы сайта.
                      </p>
                    </li>
                  </ul>
                </li>
                <li>
                  <p>
                    Издательство обеспечивает конфиденциальность персональных данных и&nbsp;применяет все
                    необходимые организационные и&nbsp;технические меры по&nbsp;их защите.
                  </p>
                </li>
                <li>
                  <p class='ng-binding'>
                    По&nbsp;желанию пользователя Издательство готово удалить любую информацию о&nbsp;нем,
                    собранную автоматическим путем. Для этого следует написать на&nbsp;адрес электронной почты{' '}
                    <a href='mailto:welcome@discours.io' target='_blank'>
                      welcome@discours.io
                    </a>
                    .
                  </p>
                </li>
                <li>
                  <p>
                    Если в&nbsp;информации, предоставляемой Издательству Пользователем, содержатся
                    персональные данные последнего, то&nbsp;фактом их&nbsp;предоставления он соглашается
                    на&nbsp;их&nbsp;обработку любым способом, не&nbsp;запрещенным законодательством РФ.
                  </p>
                  <p class='ng-binding'>
                    Общедоступные видео на&nbsp;сайте могут транслироваться с&nbsp;YouTube и&nbsp;регулируются{' '}
                    <a href='https://policies.google.com/privacy' target='_blank'>
                      политикой конфиденциальности Google
                    </a>
                    . Загрузка видео на&nbsp;сайт также означает согласие с&nbsp;
                    <a href='https://www.youtube.com/t/terms' target='_blank'>
                      Условиями использования YouTube
                    </a>
                    .
                  </p>
                </li>
                <li>
                  <p>
                    Данные, которые мы&nbsp;получаем от&nbsp;вас, мы&nbsp;используем только
                    в&nbsp;соответствии с&nbsp;принципами обработки данных, указанными в&nbsp;этом документе.
                  </p>
                </li>
              </ol>
              <h3 id='feedback'>Обратная связь</h3>
              <p class='ng-binding'>
                Любые вопросы и&nbsp;предложения по&nbsp;поводу функционирования сайта можно направить
                по&nbsp;электронной почте{' '}
                <a href='mailto:welcome@discours.io' target='_blank'>
                  welcome@discours.io
                </a>{' '}
                или через форму <a href='#feedback-idea'>&laquo;предложить идею&raquo;</a>.
              </p>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
