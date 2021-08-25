<div class="discours-banner">
  <a href="/" class="wide-container row">
    <div class="discours-banner__content col-md-5">
      <h3>Дискурс существует благодаря вашему участию</h3>
      <p>Помочь журналу</p>
    </div>
    <div class="col-md-6 offset-md-1">
      <img src="/static/discours-banner.jpg" alt="Дискурс"/>
    </div>
  </a>
</div>

<style lang="scss">
  .discours-banner {
    background: #f8f8f8;
    margin-bottom: 6.4rem;
    padding: 0.8rem 0 0;

    h3 {
      @include font-size(3.2rem);
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
    padding-left: $grid-gutter-width;
  }
</style>
