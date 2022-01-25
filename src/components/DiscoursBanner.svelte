<script>
  import { openModal } from '../stores/app'
</script>

<div class="discours-banner">
  <div class="wide-container row">
    <div class="discours-banner__content col-md-5">
      <h3>Дискурс существует благодаря вашему участию</h3>
      <p>
        <a href="/about/help">Помочь журналу</a>
        <a href="/create">Стать автором</a>
        <a href="#auth" on:click={() => ($openModal = 'auth')}
          >Присоединиться к&nbsp;сообществу</a
        >
      </p>
    </div>
    <div class="col-md-6 offset-md-1 discours-banner__image">
      <img src="/discours-banner.jpg" alt="Дискурс" />
    </div>
  </div>
</div>

<style lang="scss">
  .discours-banner {
    background: #f8f8f8;
    margin-bottom: 6.4rem;
    padding: 0.8rem 0 0;

    @include media-breakpoint-down(sm) {
      font-size: 80%;
    }

    h3 {
      font-size: 3.2rem;
      font-weight: 800;
      line-height: 1.2;
      margin: 0 0 0.5em;
    }

    p {
      margin: 0;
    }

    img {
      display: block;
      height: auto;
      width: 100%;
    }
  }

  .discours-banner__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
    padding-top: 1em;

    @include media-breakpoint-up(sm) {
      padding-left: $grid-gutter-width;
    }

    a {
      display: inline-block;
      margin: 0 1em 1em 0;
      white-space: nowrap;
    }
  }

  .discours-banner__image {
    align-items: flex-end;
    display: flex;
  }
</style>
