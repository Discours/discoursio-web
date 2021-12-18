<script>
	import UserCard from "./UserCard.svelte";
	import ShoutCard from '../components/ShoutCard.svelte'

	export let props
	let user
	$: user = props.user

	let shouts = [];

	if (props.shouts) {
		shouts = Array(Math.ceil(props.shouts.length / 5)).fill().map(function(item, index) {
			return props.shouts.slice(index * 5, index * 5 + 5);
		});
	}

	// TODO: UserFull - public user profile page
</script>

{#if user}
	<div class="container">
		<div class="row">
			<div class="user-details">
				<UserCard {user} hasFullInfo="{true}"/>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row">
			{#each shouts as group}
				<div class="floor col-12">
					<div class="row">
						{#each group.slice(0, 2) as shout}
							<div class="col-md-6">
								<ShoutCard {shout}/>
							</div>
						{/each}
					</div>
				</div>
				<div class="floor col-12">
					<div class="row">
						{#each group.slice(2, 5) as shout}
							<div class="col-md-4">
								<ShoutCard {shout}/>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}


<style lang="scss">
	.user-details {
		margin-bottom: 6.4rem;

		:global(.author__name) {
			@include font-size(3.4rem);
			font-weight: 500;
			margin-bottom: 0;
		}

		:global(.author__about) {
			color: #696969;
			@include font-size(1.7rem);
		}

		:global(.circlewrap) {
			margin-right: 4.8rem;
			max-width: 168px;
			min-width: 168px;
			height: 168px;
			width: 168px;
		}

		:global(.circlewrap .userpic) {
			font-size: 2em;
			height: 100%;
			line-height: 168px;
			width: 100%;
		}

		:global(.author__subscribe) {
			margin-top: 2rem;
		}

		:global(.author__details) {
			display: block;
		}

		:global(.button--subscribe) {
			background-color: #000;
			border-radius: 2px;
			padding-bottom: 0.6rem;
			padding-top: 0.6rem;
		}

		:global(.button__label) {
			display: block;
		}

		:global(.button--subscribe .icon) {
			filter: invert(1);
			margin-right: 0.5em;
		}

		:global(.button--subscribe img) {
			vertical-align: text-top;
		}

		:global(.button) {
			margin-right: 1.6rem;
			vertical-align: middle;
		}
	}
</style>
