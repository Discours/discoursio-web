<script>
  export let token
  let emailInput,
    confirmed = false

  $: if (token) {
    // TODO: check reset token with api once and set confirmed
    // TODO: login user and set notification
  }

  const checkEmail = () => {
    // TODO: check if user exists
    // TODO: send reset api request
  }
</script>

<div class="resetwrap">
  <h4>Сброс пароля</h4>
  <div class="row">
    {#if token}
      {#if confirmed}
        <span>Пароль был успешно сброшен.</span>
      {:else}
        <span>Что-то пошло не так, попрбуйте ещё раз</span>
      {/if}
    {:else}
      <span>
        <input type="email" bind:this={emailInput} placeholder="Ваша почта" />
      </span>
      <span on:click={() => checkEmail()}>Отправить</span>
    {/if}
  </div>
</div>
