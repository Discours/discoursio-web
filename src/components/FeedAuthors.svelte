<script lang="ts">
	import type { User } from '../lib/codegen'
	import UserCard from './UserCard.svelte'

	export let authors: User[]
</script>

<div class="feed-author">
	{#each authors as user}
		<UserCard {user} />
	{/each}
</div>
