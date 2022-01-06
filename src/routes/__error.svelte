<script lang="ts">
import { goto } from "$app/navigation"
let q = ''
const keyHandler = (ev) => {
  // FIXME: can be better
  if(ev.key === 'Enter') {
    ev.preventDefault()
    goto('/search?q='+q)
  }
}
</script>

<div class="text-center">
    <div class="error-page-wrapper">
      <div class="error-page">
        <div class="container">
          <div class="row">
            <div class="col-sm-7 col-sm-offset-3">
              <a href="/"><img class="error-image" src="https://discours.io/images/error.svg" alt="no page"></a>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-sm-3 col-sm-offset-2">
              <h2 class="error-text">ошибка 404</h2>
            </div>
            <div class="col-sm-4">
              <div class="error-explain">
                <p class="text-left">
                  Вы попали на несуществующую страницу. Попробуйте&nbsp
                  <input class='qin' type="text" placeholder="найти&nbsp;по-другому" value={q} name='q' on:keypress={keyHandler}/>
                  или <a href="/">вернуться</a> на главную.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

<style lang="scss">
  .qin {
    font-size: large;
    text-align: center;
  }
</style>