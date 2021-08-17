<script lang="ts">
import { session } from '../stores/auth'
</script>

<img src={$session.userpic} alt="userpic" />

<style>
  img {
    border-radius: 50%;
    width: 32px;
  }
</style>
