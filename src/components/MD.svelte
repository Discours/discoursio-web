<script context="module">
	import MD from 'markdown-it'
	import mdmark from 'markdown-it-mark'
	import mdfig from 'markdown-it-implicit-figures'
	// import mdcustom from 'markdown-it-container'
	import mdlinks from 'markdown-it-replace-link'
	const mit = MD({
		html: true,
		linkify: true,
		typographer: true
	})
	mit.use(mdmark)
	// mit.use(mdcustom)
	mit.use(mdfig, {
		dataType: false, // <figure data-type="image">
		figcaption: true // <figcaption>alternative text</figcaption>
	})
	mit.use(mdlinks)
</script>

<script lang="ts">
	export let body: string
</script>

{#if body.startsWith('<')}
	{@html body}
{:else}
	{@html mit.render(body)}
{/if}
