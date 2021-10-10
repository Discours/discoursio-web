<script lang="ts">
  import type { Comment } from '../graphql/codegen'
  import { authors } from '../stores/zine'
  import { parse } from 'extramark'

  export let comment: Comment
  export let canEdit: boolean

  let body = ''
  $: if(!body && comment) body = parse(comment.body)

  const edit = () => {
    console.log('TODO: comment editing...')
  }
</script>

<div class="comment">
  {#if comment}
    <div class="shout-body" contenteditable={canEdit}>
      {@html body}
    </div>
    <div class="shout-controls">
      <div class="shout-author">{$authors[comment.author].name}</div>
      <div class="shout-rating">{comment.rating}</div>
      {#if canEdit}
        <a class="editlink" href="#edit" on:click={edit}>
          {'Edit'}
        </a>
      {/if}
    </div>
  {/if}
</div>
