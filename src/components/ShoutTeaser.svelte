<script lang="ts">
    import MD from 'marked'
  
    export let shout
    // TODO: ShoutCard layout, logix
  </script>
  
  <div class="shout">
    <div class="shout-header">
      <div class="shout-title">{shout.title}</div>
    </div>
    <div class="shout-body">
      <div>{@html MD(shout.content)}</div>
    </div>
    <div class="shout-controls">
      <div class="shout-author">{shout && shout.author || 'anonymous'}</div>
      <div class="shout-rating" />
    </div>
  </div>
  