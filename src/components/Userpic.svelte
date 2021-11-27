<script lang="ts">
	// import { session } from '../stores/auth'
	import type { User } from '../lib/codegen'

	export let user: User | Partial<User>

	const letters = () => {
		const names = user && user.name ? user.name.split(' ') : []
		return names[0][0] + (names.length > 1 ? names[1][0] : '')
	}
</script>

<div class="circlewrap">
	{#if user && user.userpic === ''}
		<div class="userpic">{letters()}</div>
	{:else}
		<img src={user.userpic} alt={user.name} />
	{/if}
</div>

<style lang="scss">
	.circlewrap {
		border-radius: 100%;
		height: 32px;
		margin-right: 1.2rem;
		min-width: 32px;
		max-width: 32px;
		overflow: hidden;
		position: relative;
		width: 32px;

		img {
			height: 100%;
			object-fit: cover;
			width: 100%;
		}

		.userpic {
			border-radius: 50%;
			font-size: small;
			border: 2px solid black;
			background-color: white;
			text-align: center;
			line-height: 32px;
		}
	}
</style>
