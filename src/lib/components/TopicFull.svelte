<script lang="ts">
  import { subscribe, unsubscribe } from '$lib/cookie'

  import { subscribedTopics, topicslist } from '$lib/stores/zine'

  let subscribed = false
  export let topic

  $: if ($subscribedTopics && topic && topic.slug)
    subscribed = $subscribedTopics.includes(topic.slug)
</script>

<div class="topic-full container">
  <div class="row">
    <div class="topic__header col-md-8 offset-md-2">
      {#key $topicslist}
        {#if topic}
          <h1>#{topic.title}</h1>
          {#if topic.body}
            <p>{topic.body}</p>
          {/if}
          <div class="topic__actions">
            {#if subscribed}
              <button
                on:click={async () =>
                  (subscribed = await unsubscribe(topic.slug, 'topics'))}
                class="button">Отписаться от темы</button
              >
            {:else}
              <button
                on:click={async () =>
                  (subscribed = await subscribe(topic.slug, 'topics'))}
                class="button">Подписаться на тему</button
              >
            {/if}
            <a href={'/create/' + topic.slug}>Написать в тему</a>
          </div>
          {#if topic.pic}<img src={topic.pic} alt={topic.title} />{/if}
        {/if}
      {/key}
    </div>
  </div>
</div>

<style lang="scss">
  h1 {
    color: #2638d9;
    @include font-size(2rem);
    letter-spacing: 0.08em;
    margin-bottom: 4rem;
    text-transform: uppercase;
  }

  .topic__header {
    @include font-size(1.7rem);
    padding-top: 5.8rem;
    text-align: center;
  }

  .topic__actions {
    margin-top: 2.8rem;

    button,
    a {
      background: #000;
      border: none;
      border-radius: 2px;
      color: #fff;
      cursor: pointer;
      font-size: 100%;
      margin: 0 1.2rem;
      padding: 0.8rem 1.6rem;
    }
  }
</style>
