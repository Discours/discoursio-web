<script>
import { Link } from 'svelte-routing'
import LogoFacebook20 from 'carbon-icons-svelte/lib/LogoFacebook20'

let create = false
let loginInput, passwordInput, rememberCheck

const login = (provider) => {
  if(provider) {
    console.log('auth: signing in in with ' + provider + ' account')
  } else {
    console.log('auth: signin in with discours.io account')
  }
}

const register = (provider) => {
  if(provider) {
    console.log('auth: signing up in with ' + provider + ' account')
    // TODO: implement all of this stuff
  } else {
    console.log('auth: signin up with discours.io account')
  }
}

</script>
<!-- svelte-ignore a11y-missing-attribute -->
<div class="view">
    <div class="cell">

      <div class="tabs" style="width: 100%; height: 54px; margin-top: 16px;">
        <div class="login-tab-title half" class:active={!create} on:click={() => create?(create=false):loginInput.focus()}>
          Вход
        </div>
        <div class="register-tab-title half" class:active={create} on:click={() => create?loginInput.focus():(create=true)}>
          Регистрация
        </div>
      </div>
      
      <div style="width: 100%; height: 33px; margin-top: 16px;">
        <div class="rowflex" style="justify-content: center;">
          <div style="width: 100%;">
            <input class="login-input" bind:this={loginInput} type="text" placeholder="Ваша почта"/>
          </div>
        </div>
      </div>
      
      <div style="width: 100%; height: 33px; margin-top: 16px;">
        <div class="rowflex" style="justify-content: center;">
          <div style="width: 100%;">
            <input class="password-input" bind:this={passwordInput} type="password" placeholder="Пароль"/>
          </div>
        </div>
      </div>
      
      <div style="width: 100%; margin-top: 16px;">
        <div class="half">
          <input type="checkbox" bind:this={rememberCheck} />
          <span style="line-height: 20px;">Запомнить</span>
        </div>
        <div class="half" style="color: rgba(158.93, 161.32, 167.47, 1);">
          <Link to="/resetpassword">Сброс пароля</Link>
        </div>
      </div>

      <div style="width: 100%; height: 33px; margin-top: 16px;">
        <div class="submitbtn" on:click={() => (create?register:login)()}>
          {#if create}Создать аккаунт{:else}Войти{/if}
        </div>
      </div>
      <div style="width: 100%; height: 33px; margin-top: 16px;" class="social-provider">
        <span>Используя соцсеть: <LogoFacebook20 on:click={() => (create?register:login)('facebook')}/></span>
      </div>
    </div>
</div>

<style>  

  div {
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: center;
    min-width: 10%;
  }
  .view {
    width: 100%;
    height: 100%;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .tabs {
    font-size: large;
  }
  .rowflex {
    flex: 1 1 0%;
    height: 100%;
  }
  .password-input,
  .login-input {
    flex: 1 1 0%;
    font-size: 17px;
    line-height: 24px;
    border: none; outline: none;
  }
  .register-tab-title,
  .login-tab-title {
    height: 40px;
    flex-direction: column; 
    align-items: center;
    cursor: pointer;
    pointer-events: all;
    color: gray;
  }

  .half { 
    width: 50%;
  }
  
  .active { color: black; }

  .cell {
    display: inline-flex; 
    flex-direction: column;
  }
  .submitbtn {
    cursor: pointer;
    pointer-events: all;
    padding: 16px;
    display: flex;
    user-select: none;
    font-size: 25px;
    text-align: center;
    width: 100%;
    font-weight: 700;
    color: rgba(158.93, 161.32, 167.47, 1);
  }
  .social-provider span {
    display: none;
    color: rgba(20.40, 20.40, 20.40, 1);
  }
  input[type="text"], input[type="password"] {
    border-bottom: 1px solid rgb(162, 162, 162);
  }
</style>
