<script>
  let email = ''
  let title = 'Подписаться'

  const subscribe = async () => {
    title = '...подписываем'
    const r = await fetch('/user/maillist?email=' + email)
    title = r.ok ? 'Вы подписаны!' : 'Подписаться'
  }
</script>

<div class="subscribe-form">
  <input type="email" name="email" bind:value={email} placeholder="ваш email" />
  <a href="#subscribe" on:click|preventDefault={() => email && subscribe()}
    >{title}</a
  >
</div>

<style lang="scss">
  .subscribe-form {
    display: flex;
    width: 100%;

    input {
      background: none;
      border: none;
      border-bottom: 1px solid;
      color: #fff;
      @include font-size(2rem);
      padding: 0.2em 0.5em 0.3em 0;
      width: 100%;

      &::placeholder {
        color: #fff;
      }
    }

    a {
      background: #f7f7f7;
      border: none;
      color: #000;
      @include font-size(1.5rem);
      padding: 0 0.5em;
    }
  }
</style>
