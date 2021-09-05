<script lang="ts">
import type { Comment } from "../graphql/codegen"
import { authors } from '../stores/zine'
import MD from 'marked'

export let comment: Comment
export let canEdit: boolean

const edit = () => {
    console.log('TODO: comment editing...')
}
</script>

<div class="comment">
    {#if comment}
      <div class="shout-body" contenteditable={canEdit}>{@html MD(comment.body)}</div>
      <div class="shout-controls">
        <div class="shout-author">{$authors[comment.author].viewname}</div>
        <div class="shout-rating">{comment.rating}</div>
        {#if canEdit}
          <a class="editlink" href="#edit" on:click={edit}>
            {'Edit'}
          </a>
        {/if}
      </div>
    {/if}
</div>