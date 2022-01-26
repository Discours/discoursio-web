<script context="module">
  import MD from 'markdown-it'
  import footnotePlugin from 'markdown-it-footnote'
  import markPlugin from 'markdown-it-mark'
  // import containerPlugin from 'markdown-it-container'

  const mit = new MD()
  mit.use(footnotePlugin)
  mit.use(markPlugin)
  // mit.use(containerPlugin, name [, options])

  export const router = false
</script>

<script lang="ts">
  import Editor from './Editor.svelte'
  import { ydoc, room } from '../../stores/editor'
  import { XmlFragment } from 'yjs'
  import { onMount } from 'svelte'

  export let body
  export let collab = false

  const sync = () => {
    if (collab) {
      const remote = $ydoc.getXmlFragment($room + '-body')
      const local = body === '' ? new XmlFragment() : body
      if (remote === local) {
        console.log('editor: nothing to solve')
        body = remote
        // TODO: conflict solving logix
        // если ты редактор - правишь как обычно
        // если ты не редактор - все правки становятся предложениями (proposal)
      }
    }
  }

  onMount(sync)
</script>

<div class="container">
  <div class="row">
    <div class="col-12">
      <Editor {body} {collab} />
    </div>
  </div>
</div>

<style lang="scss">
  :global(.ProseMirror-prompt) {
    align-items: center;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    left: 0 !important;
    position: absolute;
    top: 0 !important;
    width: 100%;
    z-index: 10;
  }

  :global(.ProseMirror-prompt form) {
    background: #fff;
    padding: 2rem;
  }
</style>
