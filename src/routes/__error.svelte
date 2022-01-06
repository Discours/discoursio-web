<script lang="ts">
    // TODO: a common error page
</script>

<div class="text-center ng-scope">
    <div class="error-page-wrapper">
      <div class="error-page">
        <div class="container">
          <div class="row">
            <div class="col-sm-7 col-sm-offset-3">
              <a href="/"><img class="error-image" src="/images/error.svg"></a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-sm-3 col-sm-offset-2">
              <div class="error-text">
                <div>ошибка</div>
                <div class="big ng-binding">404</div>
              </div>
            </div>
            <div class="col-sm-4">
              <div class="error-explain">
                <p class="text-left">Вы попали на несуществующую страницу</p>
                <p class="text-left">Попробуйте найти по-другому:</p>
                <form class="errorform ng-pristine ng-valid" action="/search" method="GET">
                  <div class="discours-form">
                    <div class="form-group">
                      <input class="form-control ng-pristine ng-untouched ng-valid ng-empty" type="text" name="q" placeholder="Поиск">
                      <button>
                        <i class="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>
                <p class="text-center">
                  <a class="black-link" href="/">Вернуться на главную</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>