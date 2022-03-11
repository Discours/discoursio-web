<script context="module">
  export const prerender = true
</script>

<script lang="ts">
  import SvelteSeo from 'svelte-seo'

  import FeedbackForm from '$lib/components/FeedbackForm.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import SubscribeForm from '$lib/components/Subscribe.tsx'
  import { openModal } from '$lib/stores/app'

  const meta = {
    title: 'Манифесит Дискурса',
    description:
      'Манифест Дискурса: принципы и миссия первого журнала с горизонтальной редакцией.',
    keywords: 'Discours.io, журнал, о проекте, манифест, что это?'
  }
</script>

<SvelteSeo
  {...meta}
  openGraph={{
    ...meta,
    images: [{ url: '/images/participation.png', width: 1200, height: 630 }]
  }}
/>
<Modal name="feedback">
  <FeedbackForm />
</Modal>
<Modal name="subscribe">
  <SubscribeForm />
</Modal>
<article class="container">
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h1>Манифест</h1>
    </div>
    <div class="col-md-8 col-lg-6 offset-md-3">
      <p>
        Дискурс&nbsp;&mdash; независимый художественно-аналитический журнал
        с&nbsp;горизонтальной редакцией, основанный на&nbsp;принципах свободы
        слова, прямой демократии и&nbsp;совместного редактирования. Дискурс
        создаётся открытым медиасообществом ученых, журналистов, музыкантов,
        писателей, предпринимателей, философов, инженеров, художников
        и&nbsp;специалистов со&nbsp;всего мира, объединившихся, чтобы вместе
        делать общий журнал и&nbsp;объяснять с&nbsp;разных точек зрения
        мозаичную картину современности.
      </p>
      <p>
        Мы&nbsp;пишем о&nbsp;культуре, науке и&nbsp;обществе, рассказываем
        о&nbsp;новых идеях и&nbsp;современном искусстве, публикуем статьи,
        исследования, репортажи, интервью людей, чью прямую речь стоит услышать,
        и&nbsp;работы художников из&nbsp;разных стран&nbsp;&mdash;
        от&nbsp;фильмов и&nbsp;музыки до&nbsp;живописи и&nbsp;фотографии.
        Помогая друг другу делать публикации качественнее и&nbsp;общим
        голосованием выбирая лучшие материалы для журнала, мы&nbsp;создаём новую
        горизонтальную журналистику, чтобы честно рассказывать о&nbsp;важном
        и&nbsp;интересном.
      </p>
      <p>
        Редакция Дискурса открыта для всех: у&nbsp;нас нет цензуры, запретных
        тем и&nbsp;идеологических рамок. Каждый может
        <a href="/create">прислать материал</a>
        в&nbsp;журнал и
        <a href="/about/guide" target="_blank">присоединиться к&nbsp;редакции</a
        >. Предоставляя трибуну для независимой журналистики
        и&nbsp;художественных проектов, мы&nbsp;помогаем людям рассказывать свои
        истории так, чтобы они были услышаны. Мы&nbsp;убеждены: чем больше
        голосов будет звучать на&nbsp;Дискурсе, тем громче в&nbsp;полифонии
        мнений будет слышна истина.
      </p>
    </div>
  </div>

  <div id="participation" class="margin-bottom-40px margin-top-minus30px" />

  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h2 class="h2">
        <span class="wrapped">Как участвовать в&nbsp;самиздате</span>
      </h2>
    </div>
    <div class="col-md-8 col-lg-6 offset-md-3">
      <p>
        Дискурс создается
        <a href="/about/guide" target="_blank">открытым сообществом</a> энтузиастов
        новой независимой журналистики. Участвовать в&nbsp;открытой редакции и&nbsp;помогать
        журналу можно следующими способами:
      </p>
      <h3>Предлагать материалы</h3>
      <p>
        <a href="/create">Создавайте</a>
        свои статьи и&nbsp;художественные работы&nbsp;&mdash; лучшие из&nbsp;них
        будут опубликованы в&nbsp;журнале. Дискурс&nbsp;&mdash; некоммерческое издание,
        авторы публикуются в&nbsp;журнале на&nbsp;общественных началах, получая при
        этом
        <a href="/create?collab=true" target="_blank">поддержку</a> редакции, право
        голоса, множество других возможностей и&nbsp;читателей по&nbsp;всему миру.
      </p>
      <h3>Поддерживать проект</h3>
      <p>
        Дискурс существует на&nbsp;пожертвования читателей. Если вам нравится
        журнал, пожалуйста, <a href="/about/help">поддержите</a> нашу работу. Ваши
        пожертвования пойдут на&nbsp;выпуск новых материалов, оплату серверов, труда
        программистов, дизайнеров и&nbsp;редакторов.
      </p>
      <h3>Сотрудничать с&nbsp;журналом</h3>
      <p>
        Мы&nbsp;всегда открыты для сотрудничества и&nbsp;рады единомышленникам.
        Если вы хотите помогать журналу с&nbsp;редактурой, корректурой,
        иллюстрациями, переводами, версткой, подкастами, мероприятиями,
        фандрайзингом или как-то ещё&nbsp;&mdash; скорее пишите нам на
        <a href="mailto:welcome@discours.io" target="_blank"
          >welcome@discours.io</a
        >.
      </p>
      <p>
        Если вы&nbsp;представляете некоммерческую организацию и&nbsp;хотите
        сделать с&nbsp;нами совместный проект, получить информационную поддержку
        или предложить другую форму сотрудничества, пишите на
        <a href="mailto:welcome@discours.io" target="_blank"
          >welcome@discours.io</a
        >.
      </p>
      <p>
        Если вы&nbsp;разработчик и&nbsp;хотите помогать с&nbsp;развитием
        платформы, пишите на
        <a href="mailto:services@discours.io" target="_blank"
          >services@discours.io</a
        >
        &mdash;&nbsp;будем рады принять вас в&nbsp;нашу IT-команду.
      </p>
      <h3>Как еще можно помочь</h3>
      <p>
        Советуйте нас друзьям и&nbsp;знакомым, в&nbsp;том числе тем, кто
        занимается просветительской и&nbsp;творческой деятельностью. Делитесь
        нашими материалами &mdash; все наши публикации можно читать
        и&nbsp;перепечатывать бесплатно. Подпишитесь на&nbsp;Дискурс
        <a href="https://vk.com/discoursio" target="_blank">ВКонтакте</a>,
        в&nbsp;<a href="https://facebook.com/discoursio" target="_blank">
          Фейсбуке</a
        >
        и&nbsp;в
        <a href="https://t.me/discoursio" target="_blank"> Телеграме</a>,
        а&nbsp;также на&nbsp;<a href="#subscribe">рассылку лучших материалов</a
        >, чтобы не&nbsp;пропустить ничего интересного.
      </p>
    </div>
  </div>
  <div id="connection" class="margin-bottom-40px margin-top-minus30px" />
  <div class="row">
    <div class="col-md-8 offset-md-2">
      <h2 class="h2">
        <span class="wrapped">Будем на&nbsp;связи</span>
      </h2>
    </div>
    <div class="col-md-8 col-lg-6 offset-md-3">
      <p>
        Если вы&nbsp;хотите предложить материал, сотрудничать, рассказать
        о&nbsp;проблеме, которую нужно осветить, что-то обсудить или
        посоветовать, пожалуйста, напишите нам через
        <a href="#feedback">эту форму</a> или на&nbsp;почту
        <a href="mailto:welcome@discours.io" target="_blank"
          >welcome@discours.io</a
        >. Мы&nbsp;обязательно ответим и&nbsp;постараемся реализовать все
        хорошие задумки.
      </p>
    </div>
  </div>
</article>
