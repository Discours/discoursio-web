<script lang="ts">
  import MD from 'marked'
  import type { Shout } from '../graphql/codegen'
  import { orgRole, AS } from '../stores/auth'

  export let shout: Shout
  export let editing: boolean

  const editShout = (shout) => {
    console.log(shout)
  }
</script>

<div class="shout">
  {#if shout}
    <div class="shout-title">
      {shout.title}
    </div>
    <div class="shout-body" contenteditable={editing}>
      {@html MD(shout.body)}
    </div>
    <div class="shout-controls">
      <div class="shout-author">{shout.author || 'anonymous'}</div>
      <div class="shout-rating">+22</div>
      {#if $orgRole >= AS.EDITOR}
        <a class="editlink" href="#edit" on:click={() => editShout(shout)}>
          {'Edit'}
        </a>
      {/if}
    </div>
  {/if}
</div>
