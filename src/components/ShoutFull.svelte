<script lang="ts">
  import MD from 'marked'
  import type { Shout } from '../graphql/codegen'
  import { orgRole, AS, session } from '../stores/auth'
  import { authors } from '../stores/zine'
  import ShoutComment from '../components/ShoutComment.svelte'

  export let shout: Shout
  export let canEdit: boolean

  const edit = (shout) => {
    console.log(shout)
  }
</script>

<div class="shout">
  {#if shout}
    <div class="shout-title">
      {shout.title}
    </div>
    <div class="shout-body" contenteditable={canEdit}>
      {@html MD(shout.body)}
    </div>
    <div class="shout-controls">
      {#each shout.authors as author}
        <div class="shout-author">{author.viewname}</div>
      {/each}
      <div class="shout-rating">+22</div>
      {#if $orgRole >= AS.EDITOR}
        <a class="editlink" href="#edit" on:click={() => edit(shout)}>
          {'Edit'}
        </a>
      {/if}
    </div>
    <div class="shout-comments">
      {#each shout.comments as comment}
        <ShoutComment {comment} canEdit={ comment.author === $session.id } />
      {/each}
    </div>
  {/if}
</div>
