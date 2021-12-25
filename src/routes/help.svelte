<script context="module">
	export const prerender = true
</script>
<script lang="ts">
    import { fade } from "svelte/transition"
    import SvelteSeo from 'svelte-seo'

    let paymentTypeShowing = true
    let sum = 500
    let isOnItemPage = true
    let inputSumrm
    let inputSum
    let value = 500

    const clickDonate = async () => {
        console.log('help: donate clicked')
    }

    const meta = {
      title: "Поддержите Дискурс",
      description: "Здесь можно поддержать Дискурс материально.",
      keywords: "Discours.io, помощь, благотворительность"
    }

    const handleSumButtonClick = () => {
      // 
    }
</script>


<SvelteSeo {...meta} openGraph={{ ...meta, images: [{ url: '/images/donate.jpg' }] }} />
<div class="container open-post help-us-page ng-scope">
  <div class="row">
    <div class="col-md-7 col-md-offset-2 post-body">
      <h1 class="h2 black-bg-heading">
        <span class="wrapped">Поддержите Дискурс</span>
      </h1>

      <p>
        Дискурс&nbsp;— независимое некоммерческое издание с&nbsp;открытой
        редакцией, выступающее трибуной для свободной журналистики и нового
        искусства. Мы&nbsp;выпускаем статьи, репортажи, исследования, подкасты,
        а также музыку, художественные&nbsp;проекты, фильмы и литературу,
        ежедневно помогая людям со&nbsp;всего&nbsp;мира рассказывать истории
        так, чтобы они были услышаны&nbsp;— но&nbsp;не&nbsp;сможем делать
        этого без&nbsp;вашей&nbsp;помощи.
      </p>
      <div class="row margin-top-30px">
        <div class="col-md-12">
          <donate-form class="ng-isolate-scope">

<div class="donate-container ng-scope">
  <form class="discours-form donate-form ng-pristine ng-valid ng-submitted" method="post" ng-submit="$ctrl.handleSubmit($event)" style="">
    <input type="hidden" name="shopId" value="156465" autocomplete="off">
    <input value="148805" name="scid" type="hidden" autocomplete="off">
    <input value="0" name="customerNumber" type="hidden" autocomplete="off">

    <div class="form-group donate-col donate-buttons-container" data-toggle="buttons">
      <!-- ngRepeat: val in $ctrl.sums -->
      <label class="btn btn-border donate-value-radio" on:click={handleSumButtonClick} class:active={value === 250 && !inputSumrm}>
        <input type="radio" checked={value === 250}>250&thinsp;₽
      </label>
      <label class="btn btn-border donate-value-radio ng-binding ng-scope active" ng-repeat="val in $ctrl.sums" ng-click="$ctrl.handleSumButtonClick(val)" class:active={value === sum && !inputSumrm}>
        <input type="radio" ng-checked="val === $ctrl.sum" checked>500&thinsp;₽
      </label><!-- end ngRepeat: val in $ctrl.sums --><label class="btn btn-border donate-value-radio ng-binding ng-scope" ng-repeat="val in $ctrl.sums" ng-click="$ctrl.handleSumButtonClick(val)" class:active={value === sum && !inputSumrm}>
        <input type="radio" ng-checked="val === $ctrl.sum">1000&thinsp;₽
      </label><!-- end ngRepeat: val in $ctrl.sums -->
      <input class="form-control donate-input ng-pristine ng-untouched ng-valid ng-empty" autocomplete="off" placeholder="Другая сумма" type="number" ng-model="$ctrl.inputSum" ng-change="$ctrl.handleSumChange($event)" ng-focus="$ctrl.handleSumChange($event)" class:active={inputSum && inputSum === sum}>
      <input type="hidden" required ng-value="$ctrl.sum" name="sum" autocomplete="off" value="500">
    </div>

    <div class="donate-private-data">
      <div id="payment-type" class="btn-group payment-choose-type">
        <input type="radio" autocomplete="off" name="rebillingOn" ng-model="$ctrl.rebillingOn" value="0" id="rebilling-off" class="ng-pristine ng-untouched ng-valid ng-not-empty"><label class="btn btn-border donate-value-radio payment-type" for="rebilling-off">
          Единоразово
        </label>
        <input type="radio" autocomplete="off" name="rebillingOn" value="1" checked ng-model="$ctrl.rebillingOn" id="rebilling-on" class="ng-pristine ng-untouched ng-valid ng-not-empty"><label class="btn btn-border donate-value-radio payment-type" for="rebilling-on">
          Ежемесячно
        </label>
      </div>

      <div class="form-group">
        <button class="btn-border donate-send-btn" type="submit">
          ПОМОЧЬ <ins class="donate-send-btn-label">ЖУРНАЛУ</ins>
        </button>
      </div>
    </div>

    {#if isOnItemPage}
    <div class="donate-agreement ng-scope">
      Совершая перевод, вы принимаете
      <a href="https://discours.io/donate-offer" target="_blank">оферту</a>
    </div>
    {/if}
  </form>
</div>
</donate-form>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-7 col-md-offset-2 post-body">
      <p>
        С&nbsp;вашей&nbsp;помощью мы&nbsp;сможем развивать платформу, делать
        сайт удобнее, чаще публиковать&nbsp;статьи, создавать мультимедийные
        спецпроекты и переводить важные тексты с других языков. В первую очередь
        пожертвования пойдут на&nbsp;выпуск новых материалов, оплату
        серверов,&nbsp;труда редакторов, дизайнеров и программистов. Когда
        пожертвования обеспечат бесперебойную работу проекта, мы&nbsp;сформируем
        премиальный фонд, чтобы награждать авторов лучших
        материалов&nbsp;месяца.
      </p>
      <p>
        Если вы&nbsp;решите отказаться от&nbsp;регулярных пожертвований,
        изменить размер или дату списания платежа, просто напишите нам
        на&nbsp;<a href="mailto:donate@discours.io" target="_blank">donate@discours.io</a>
        — мы&nbsp;в&nbsp;любой момент отменим подписку или настроим
        ее&nbsp;так, как вам удобно.
      </p>
      <p>
        Если вы не можете поддержать журнал финансово, но&nbsp;хотите помочь,
        есть <a href="/manifest#participation">много других</a> способов
        участвовать в&nbsp;Дискурсе. Например, можно рассказывать о&nbsp;проекте
        друзьям, делиться нашими материалами, предлагать редакции темы,
        публиковать свои статьи в&nbsp;Дискурсе. Если вы&nbsp;хотите помочь или
        предложить сотрудничество&nbsp;— просто
        <a view-modal="#send-idea-modal" ng-click="closePartners($event)" target="_blank">напишите нам</a>. Мы&nbsp;всегда рады единомышленникам и обязательно ответим.
      </p>
    </div>
  </div>
</div>