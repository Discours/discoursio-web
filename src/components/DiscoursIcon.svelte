<script lang="ts">
	export let name: string
	export let title = ''
	export let counter = 0
</script>

<div class="icon">
	<img src={'icons/' + name + '.svg'} alt={title ?? name} />
	{#if counter != 0}<div class="counter">{counter.toString()}</div>{/if}
</div>

<style>
	.icon {
		position: relative;
	}
	img {
		width: 100%;
		height: 100%;
	}
	.counter {
		background-color: red;
		font-size: 1rem;
		font-weight: 700;
		color: white;
		position: absolute;
		width: 1rem;
		text-align: center;
		top: -0.5rem;
		right: -0.5rem;
		border-radius: 1rem;
	}
</style>
