<script lang="ts">
	export let topic
	// TODO: topic full is a community topic feed index
</script>

<div class="topic-full">
	{#if topic}
		<img src={topic.pic} />
		<h5>{topic.title}</h5>
		{#if topic.body}
			<div class="topic-body">
				{@html topic.body}
			</div>
		{/if}
	{/if}
</div>
