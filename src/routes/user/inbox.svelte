<!-- svelte-ignore a11y-missing-attribute -->
<script lang="ts">
  // TODO: getMessages graphql query
  import Icon from '$lib/components/DiscoursIcon.svelte'
  import UserCard from '$lib/components/UserCard.svelte'
</script>

<svelte:head><title>Дискурс : Чаты</title></svelte:head>

<!-- svelte-ignore a11y-missing-attribute -->

<div class="messages container">
  <div class="row">
    <div class="chat-list col-md-4">
      <form class="chat-list__search">
        <input type="search" placeholder="Поиск" />
        <button class="button">+</button>
      </form>

      <div class="chat-list__types">
        <ul>
          <li><strong href="/">Все</strong></li>
          <li><a href="/">Переписки</a></li>
          <li><a href="/">Группы</a></li>
        </ul>
      </div>

      <div class="chat-list__users">
        <ul>
          <li>
            <UserCard user={{}} hasSubscribeButton={false} />
            <div class="last-message-date">12:15</div>
            <div class="last-message-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </div>
          </li>
          <li class="user--online chat-list__user--current">
            <UserCard user={{}} hasSubscribeButton={false} />
            <div class="last-message-date">19:48</div>
            <div class="last-message-text">
              Assumenda delectus deleniti dolores doloribus ducimus, et expedita
              facere iste laborum, nihil similique suscipit, ut voluptatem.
              Accusantium consequuntur doloremque ex molestiae nemo.
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="col-md-8 conversation">
      <div class="interlocutor user--online">
        <UserCard user={{}} hasSubscribeButton={false} />
        <div class="user-status">Online</div>
      </div>

      <div class="conversation__messages">
        <div class="conversation__messages-container">
          <div
            class="conversation__message-container conversation__message-container--other"
          >
            <div class="conversation__message">
              Круто, беру в оборот!
              <div class="conversation__message-details">
                <time>14:26</time>
              </div>

              <button class="conversation__context-popup-control">
                <Icon name="ellipsis" />
              </button>
            </div>
          </div>

          <div
            class="conversation__message-container conversation__message-container--own"
          >
            <div class="conversation__message">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              beatae earum iste itaque libero perspiciatis possimus quod!
              Accusamus, aliquam amet consequuntur debitis dolorum esse
              laudantium magni omnis rerum voluptatem voluptates!
              <div class="conversation__message-details">
                <time>14:31</time> Отредактировано
              </div>

              <button class="conversation__context-popup-control">
                <Icon name="ellipsis" />
              </button>
            </div>
          </div>

          <div class="conversation__date">
            <time>12 сентября</time>
          </div>

          <div
            class="conversation__message-container conversation__message-container--other"
          >
            <div class="conversation__message">
              Нужна грамотная инфраструктура для сообщений, если ожидается
              нагрузка - надо опираться на это. Но в целом это несложно сделать,
              а те кто избегают таких задач вообще недостаточно квалифицированы
              для нас)
              <div class="conversation__message-details">
                <time>10:47</time>
              </div>

              <button class="conversation__context-popup-control">
                <Icon name="ellipsis" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <form class="conversation__message-form">
        <input type="text" placeholder="Написать сообщение" />
        <button type="submit">
          <Icon name="send-message" />
        </button>
      </form>
    </div>
  </div>
</div>

<style lang="scss">
  :global(main) {
    display: flex;
    height: 100%;
    flex-direction: column;
    position: relative;
  }

  .messages {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100%;
    position: relative;

    > :global(.row) {
      flex: 1;
    }

    :global(.author__name) {
      font-weight: 500;
    }

    :global(.author) {
      position: relative;
    }

    .user--online :global(.author) {
      &:before {
        background: #2bb452;
        border: 5px solid #fff;
        border-radius: 100%;
        content: '';
        height: 5px;
        left: 20px;
        position: absolute;
        top: 0;
        width: 5px;
        z-index: 1;
      }
    }

    :global(.circlewrap) {
      position: absolute;
    }
  }

  .chat-list {
    border-right: 1px solid #141414;
    display: flex;
    flex-direction: column;

    :global(.author__name) {
      @include font-size(1.5rem);
    }
  }

  .chat-list__search,
  .interlocutor {
    border-bottom: 3px solid #141414;
    padding: 1em 0;
  }

  .chat-list__search {
    display: flex;

    input,
    :global(.button) {
      border-radius: 2px;
      height: 5.6rem;
      line-height: 5.6rem;
      vertical-align: bottom;
    }

    input {
      border: 2px solid #e8e8e8;
      flex: 1;
      @include font-size(1.7rem);
      margin-right: 1.6rem;
      padding: 1.6rem 1.2rem;
    }

    :global(.button) {
      @include font-size(4rem);
      font-weight: 100;
      padding: 0;
      width: 5.6rem;
    }
  }

  .chat-list__types {
    @include font-size(1.7rem);
    margin-bottom: 1.5em;
    padding-top: 1em;

    ul {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      margin-right: 1em;
    }

    strong {
      border-bottom: 3px solid;
      font-weight: normal;
    }
  }

  .chat-list__users {
    flex: 1;
    position: relative;

    ul {
      height: 100%;
      list-style: none;
      margin: 0;
      overflow: auto;
      padding: 0;
      position: absolute;
      width: 100%;
    }

    li {
      align-items: baseline;
      background: #fff;
      cursor: pointer;
      display: flex;
      flex-wrap: wrap;
      @include font-size(1.5rem);
      padding: 2.4rem 0.8rem;
      position: relative;
      transition: background-color 0.3s;

      &:hover {
        background: #f6f6f6;
      }
    }

    .chat-list__user--current {
      background: #f6f6f6;
      cursor: default;
    }

    :global(.author) {
      flex: 1;
      margin-bottom: 0;
    }

    :global(.author__details) {
      margin-left: 4.2rem;
    }

    .last-message-date {
      color: rgba(0, 0, 0, 0.3);
      @include font-size(1rem);
    }

    .last-message-text {
      color: rgba(0, 0, 0, 0.3);
      flex: 1 100%;
      margin-left: 4.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .interlocutor {
    height: 56px;
    box-sizing: content-box;

    :global(.circlewrap) {
      height: 56px;
      max-width: 56px;
      width: 56px;
    }

    :global(.author) {
      margin-bottom: 0;

      &:before {
        left: 40px !important;
        height: 8px !important;
        width: 8px !important;
      }
    }

    :global(.author__name) {
      @include font-size(1.7rem);
      margin: 0.4em 0 0;
    }

    :global(.author__details),
    .user-status {
      margin-left: 6.8rem;
    }

    .user-status {
      @include font-size(1.2rem);
      color: #ccc;
    }
  }

  .conversation {
    display: flex;
    flex-direction: column;
  }

  .conversation__messages {
    flex: 1;
    min-height: 20em;
    overflow: auto;
    position: relative;
  }

  .conversation__message-form {
    border-top: 1px solid #141414;
    display: flex;
    padding: 1em 1em 1em 0;

    input {
      border: none;
      @include font-size(2rem);
      height: 5.6rem;
      width: 100%;
    }

    button {
      border: none;
      cursor: pointer;
      padding: 0 0 0 0.4em;
      text-align: center;
      width: 5.6rem;

      &:hover {
        :global(.icon) {
          opacity: 0.5;
        }
      }

      :global(.icon) {
        height: 50%;
        margin: 0 auto;
        opacity: 0.2;
        transition: opacity 0.3s;
        width: 50%;
      }
    }
  }

  .conversation__messages-container {
    left: 0;
    height: 100%;
    overflow: auto;
    position: absolute;
    top: 0;
    width: 100%;
  }

  .conversation__date {
    position: relative;
    text-align: center;

    &:before {
      background: #141414;
      content: '';
      height: 1px;
      left: 0;
      position: absolute;
      top: 0.8em;
      width: 100%;
      z-index: -1;
    }

    time {
      background: #fff;
      @include font-size(1.5rem);
      color: #9fa1a7;
      padding: 0 0.5em;
    }
  }

  .conversation__message-container {
    display: flex;
    margin: 3.2rem 0;
  }

  .conversation__message {
    @include font-size(1.5rem);
    max-width: 60%;
    padding: 1.6rem 2.4rem;
    position: relative;

    &:hover {
      .conversation__context-popup-control {
        opacity: 1;
      }
    }
  }

  .conversation__message-details {
    color: #9fa1a7;
    @include font-size(1rem);
    left: 0;
    padding-top: 0.2em;
    position: absolute;
    top: 100%;
  }

  .conversation__message-container--other {
    .conversation__message {
      background: #f6f6f6;
      border-right: 0.3em solid #fff;
    }

    .conversation__context-popup-control {
      left: 100%;
      margin-left: 0.3em;
    }
  }

  .conversation__message-container--own {
    justify-content: flex-end;

    .conversation__message {
      background: #000;
      border-left: 0.3em solid #fff;
      color: #fff;
    }

    .conversation__context-popup-control {
      margin-right: 0.3em;
      right: 100%;
    }
  }

  .conversation__context-popup-control {
    background: #f6f6f6;
    border: none;
    cursor: pointer;
    height: 2.4rem;
    margin-top: -1.2rem;
    opacity: 0;
    top: 50%;
    position: absolute;
    transition: opacity 0.3s;
    width: 2.4rem;

    &:hover {
      :global(.icon) {
        opacity: 0.5;
      }
    }

    :global(.icon) {
      opacity: 0.3;
      transition: opacity 0.2s;
    }

    :global(img) {
      vertical-align: middle;
    }
  }
</style>
