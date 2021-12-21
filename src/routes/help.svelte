<script context="module">
	export const prerender = true
</script>
<script lang="ts">
    import { fade } from "svelte/transition"

    let paymentTypeShowing = true

    const clickDonate = async () => {
        console.log('help: donate clicked')
    }
</script>

<update-meta title="Поддержите Дискурс"></update-meta>
<update-meta
  name="description"
  content="Здесь можно поддержать Дискурс материально."
></update-meta>
<update-meta
  name="keywords"
  content="Discours.io, помощь, благотворительность"
></update-meta>
<update-meta property="og:title" content="Поддержите Дискурс"></update-meta>
<update-meta
  property="og:description"
  content="Здесь можно поддержать Дискурс материально."
></update-meta>
<!-- update-meta(property="og:image" content="/images/logo.png") -->
<div class="container">
  <div class="row">
    <div class="col-sm-6">
      <h1 class="h2 black-bg-heading margin-top-100px">
        <span>Как вы можете поддержать Дискурс?</span>
      </h1>
    </div>
    <div class="col-sm-6 margin-top-30px help-us">
      <h4 class="black-bg-heading normal margin-bottom-30px">
        <span>Дискурс —</span>
      </h4>
      <p>
        уникальное независимое издание с горизонтальной редакцией, существующее
        в интересах своих читателей. Ваша поддержка действительно много значит –
        не только для редакции Дискурса, но и для сохранения свободной мысли и
        некоммерческого искусства в нашем обществе.
      </p>
      <p>
        Дискурс существует на добровольных началах. Никакой медиахолдинг, фонд
        или государственная структура не финансирует нас – благодаря этому мы
        можем писать о том, что важно, а не о том, что выгодно. Сообщество наших
        волонтеров ежедневно трудится, чтобы рассказывать вам интересные, не
        освещенные другими изданиями истории – но мы не сможем делать это без
        вашей помощи. Пожертвования читателей составляют основу нашего бюджета и
        позволяют нам существовать.
      </p>
      <p>
        Если вам нравится то, что мы делаем и вы хотите, чтобы Дискурс
        продолжался, пожалуйста, поддержите проект.
      </p>
      <div class="row margin-top-50px margin-bottom-50px">
        <div class="col-sm-9">
          <form
            class="discours-form border"
            action="https://money.yandex.ru/eshop.xml"
            method="post"
          >
            <input type="hidden" name="shopId" value="156465" />
            <input value="148805" name="scid" type="hidden" />
            <input value="0" name="customerNumber" type="hidden" />
            <div class="row form-group">
              <div class="col-sm-4"><label class="small">сумма</label></div>
              <div class="col-sm-6">
                <input
                  class="form-control"
                  required
                  name="sum"
                  value="200"
                />
              </div>
              <div class="col-sm-2"><label class="small">руб</label></div>
            </div>
            <div class="row form-group">
              <div class="col-sm-4">
                <label class="small">способ оплаты</label>
              </div>
              <div class="col-sm-8">
                <div class="btn-group payment-choose" data-toggle="buttons">
                  <label
                    class="btn btn-border"
                    on:click={() => paymentTypeShowing = false}
                  >
                    <input
                      type="radio"
                      autocomplete="off"
                      name="paymentType"
                      value="PC"
                    /><img src="/images/money/yandex.svg" alt="Я.Деньги" />
                  </label>
                  <label
                    class="btn btn-border active"
                    on:click={ () => paymentTypeShowing = true }
                  >
                    <input
                      type="radio"
                      autocomplete="off"
                      name="paymentType"
                      value="AC"
                      checked
                    /><img
                      src="/images/money/visa_mastercard.svg"
                      alt="С помощью карты"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div class="row form-group" id="payment-type" transition:fade class:showing={paymentTypeShowing}>
              <div class="col-sm-4">
                <label class="small">тип платежа</label>
              </div>
              <div class="col-sm-8">
                <div class="btn-group payment-choose" data-toggle="buttons">
                  <label class="btn btn-border">
                    <input
                      type="radio"
                      autocomplete="off"
                      name="rebillingOn"
                      value="0"
                    />Единоразовый
                  </label>
                  <label class="btn btn-border active">
                    <input
                      type="radio"
                      autocomplete="off"
                      name="rebillingOn"
                      value="1"
                      checked
                    />Ежемесячный
                  </label>
                </div>
              </div>
            </div>
            <div class="row form-group">
              <div class="col-sm-8 col-sm-offset-4">
                <button class="btn-border">подарить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <h3 class="black-bg-heading bold">На что пойдут деньги?</h3>
      <p class="margin-top-30px">
        Ваши пожертвования пойдут на оплату серверов, содержание офиса, зарплату
        редакции и налоги, оплату юридического сопровождения и труда бухгалтера,
        совершенствование сайта, аренду помещения для открытой редакции, на
        печать альманаха Дискурс с лучшими текстами авторов за полгода, а также
        на другие редакционные и технические расходы.
      </p>
      <h3 class="black-bg-heading bold">Ваша помощь позволит нам</h3>
      <ul class="discours-text-list margin-top-30px">
        <li>
          <h4 class="white-bg-heading">Оставаться бесплатным изданием.</h4>
          <p>
            Мы делаем открытый журнал для всех желающих, а также собираем
            искусство лучших авторов по всему миру. Ваша поддержка позволяет нам
            становиться лучше.
          </p>
        </li>
        <li>
          <h4 class="white-bg-heading">Создавать еще больше контента.</h4>
          <p>
            Каждый день к нам присоединяются новые люди, и чем больше нас
            становится, тем больше мы творим и строже оцениваем результаты
            творчества друг друга. В результате повышается и количество, и
            качество контента. Каждый день мы трудимся, чтобы открывать нашим
            читателям новые грани окружающего мира.
          </p>
        </li>
        <li>
          <h4 class="white-bg-heading">
            Развивать форматы и расширять деятельность Дискурса.
          </h4>
          <p>
            Мы создаем различные спецпроекты и регулярно проводим необычные
            мероприятия. Мы хотим приносить пользу человечеству всеми возможными
            способами.
          </p>
        </li>
        <li>
          <h4 class="white-bg-heading">Модернизировать сайт.</h4>
          <p>
            Мы совершенствуем платформу и стараемся сделать проект максимально
            удобным для вас. Мы работаем над мобильной версией, новым дизайном,
            фукционалом, системой регистрации, навигации и рекомендаций, которые
            сделают наше общение еще увлекательней.
          </p>
        </li>
        <li>
          <h4 class="white-bg-heading">Выпускать альманах.</h4>
          <p>
            Выпускать раз в полугодие печатный альманах Дискурс с 33 лучшими
            текстами сайта.
          </p>
        </li>
        <li>
          <h4 class="white-bg-heading">Захватить весь мир</h4>
          <p>и принести «Дискурс» в каждый дом.</p>
        </li>
      </ul>
      <h3 class="black-bg-heading bold">
        Войдите в попечительский совет Дискурса
      </h3>
      <p>
        Вы хотите сделать крупное пожертвование? Станьте попечителем Дискурса –
        {{}}<a
          class="black-link"
          href="mailto:welcome@discours.io"
          target="_blank"
          >напишите нам</a
        >, мы будем рады единомышленникам.
      </p>
      <h3 class="black-bg-heading bold">Как ещё можно поддержать Дискурс?</h3>
      <p>
        Есть много других способов поддержать Дискурс и труд наших авторов.
        Например, вы можете периодически рассказывать о проекте своим друзьям в
        соцсетях, делиться хорошими материалами или – что еще лучше –
        публиковать свои статьи в «Дискурсе». Но главное, что вы можете сделать
        для Дискурса, – читать нас. Мы вкладываем в журнал душу, и внимание
        каждого читателя убеждает нас в правильности выбранного пути. Не
        переключайтесь.
      </p>
      <p>
        Если вы хотите помочь проекту, но у вас возникли вопросы, напишите нам
        письмо по адресу {{}}<a
          class="black-link"
          href="mailto:welcome@discours.io"
          target="_blank"
          >welcome@discours.io</a
        >.
      </p>
    </div>
  </div>
</div>
