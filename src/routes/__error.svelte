<script lang="ts">
import { goto } from "$app/navigation";
let searchReady = false
let waitingFrom = Date.now()
let q = ''
const hold = () => {
  if(q.length < 4) return
  else {
    if((Date.now() - waitingFrom) > 3000) searchReady = true // let 3 seconds thinking
    else return
  }
}
const inputHandler = (ev) => {
  console.log(ev)
  hold()
}
const keyHandler = (ev) => {
  if(ev.key === 'Enter') searchReady = true
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
                <p class="text-left">Вы попали на несуществующую страницу.
                  {#if searchReady}
                  <input class='qin' type="text" placeholder="найти&nbsp;по-другому" value={q} name='q' on:change={inputHandler} on:keypress={keyHandler}/>
                  <a class='search-btn' href={`/search?q=${q}`}><img src='/icons/search.svg' alt='search' /></a>
                  {:else}
                  Попробуйте&nbsp<input class='qin' type="text" placeholder="найти&nbsp;по-другому" value={q} name='q' on:change={inputHandler} on:keypress={keyHandler}/>
                  {/if}
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
  .search-btn {
    text-decoration: none;
    font-size: medium;
    border: 0; outline: 0;
    height: 46px;
    box-shadow: 0 0 2px 1px;
  }
</style>