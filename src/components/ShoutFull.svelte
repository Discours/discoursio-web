<script lang="ts">
  import type { Shout } from '../graphql/codegen'
  import { roles, AS, session } from '../stores/auth'
  // import { authors } from '../stores/zine'
  import ShoutComment from '../components/ShoutComment.svelte'
  import MD from 'markdown-it'
import Author from './Author.svelte'
import Userpic from './Userpic.svelte';
  const mit = MD()
  
  export let shout: Shout | Partial<Shout>
  export let canEdit: boolean = false
  export let editMode: boolean = false

  $: if($session && shout && shout.authors) {
    canEdit = !!shout.authors.find(a => a.slug === $session.slug)
    // TODO: support editors from community
  }

  let body = ''
  let inputs = {
    title: '',
    subttitle: '',
    body: '',
    cover: '',
    layout: 'article',
    topics: [],// TODO: topics selector component
    authors: [], // TODO: insert yourself automatically
    createdAt: new Date().toUTCString() // TODO: update on submit

  } // dynamic binding

  const options: MD.Options = {}

  $: if(!body && shout) {
    // let tokens: any[] = mit.parse(shout.body, options)
    // tokens.forEach(console.debug)
  }

  const handleInput = (ev) => {
    // event handling when you type something
  }

  const editSubmit = () => {
    shout = Object.assign({}, shout, inputs)
  }
</script>

<div class="shout">
  {#if shout}
    <div class="shout-title" on:input={handleInput} contenteditable={canEdit && editMode}>
      {shout.title}
    </div>
    <div class="shout-body" contenteditable={canEdit && editMode} on:input={handleInput}>
      {@html body}
    </div>
    <div class="shout-controls">
      {#each shout.authors as author}
        <div class="shout-author">
          <a href={`/@${author.slug}`}><Userpic author={author} />{author.name}</a>
        </div>
      {/each}
      <div class="shout-rating">{(shout.rating > 0 ? '+': '') + shout.rating.toString()}</div>
      <a class="modeswitch" href={''} on:click|preventDefault={() => editMode = !editMode}>
        {editMode ? '👀' : '✍🏻'}
      </a>
      {#if canEdit}
        <a class="updatelink" href={''} on:click|preventDefault={editSubmit}>Отправить</a>
      {/if}
    </div>
    <div class="shout-comments">
      {#each shout.comments as comment}
        <ShoutComment {comment} canEdit={comment.author === $session.id} />
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
:global(mark) {
  text-decoration: none;
  background-color: transparent;
  font-weight: 800;
}
</style>