<script lang="ts">
  import { openModal } from '../stores/app'
</script>

<div class="about-discours">
  <div class="wide-container row">
    <div class="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
      <h4>Горизонтальная платформа для коллаборативной журналистики</h4>
      <p>
        Дискурс&nbsp;&mdash; это интеллектуальная среда, веб-пространство
        и&nbsp;инструменты, которые позволяют авторам сотрудничать
        с&nbsp;читателями и&nbsp;объединяться для совместного создания
        публикаций и&nbsp;медиа-проектов.
        <br />
        <em
          >Мы&nbsp;убеждены, один голос хорошо, а&nbsp;много&nbsp;&mdash; лучше.
          Самые потрясающие истории мы&nbsp;создаём вместе.</em
        >
      </p>
      <div class="about-discours__actions">
        <a class="button" href="#auth" on:click={() => ($openModal = 'auth')}
          >присоединитьсяк&nbsp;сообществу</a
        >
        <a class="button" href="/create">стать&nbsp;автором</a>
        <a class="button" href="/about/manifest">о&nbsp;проекте</a>
        <a class="button" href="/about/help">поддержать&nbsp;платформу</a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .about-discours {
    background: #000;
    color: #fff;
    @include font-size(1.7rem);
    font-weight: 400;
    padding: 3.6rem 0;
    margin-bottom: 6.4rem;

    @include media-breakpoint-up(md) {
      padding: 6.2em 0;
    }

    h4 {
      margin-bottom: 4rem;
    }

    em {
      font-weight: inherit;
    }

    .wide-container {
      padding: 0;
    }
  }

  .about-discours__actions {
    margin-top: 4.8rem;

    .button {
      border: 3px solid;
      border-radius: 1.2em;
      display: inline-block;
      font-weight: bold;
      margin-right: 0.3em;
      margin-bottom: 0.8em;
    }
  }
</style>
