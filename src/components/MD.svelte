<script context="module">
	import MD from 'markdown-it'
	import mdanch from 'markdown-it-anchor'
	import mark from 'markdown-it-mark'
	import implicit from 'markdown-it-implicit-figures'
	import mdcustom from 'markdown-it-container'
	// import hl from 'markdown-it-highlight'

	const mit = MD()
	mit.use(mdanch)
	mit.use(mark)
	mit.use(mdcustom)
	mit.use(implicit, {
		dataType: false, // <figure data-type="image">
		figcaption: true // <figcaption>alternative text</figcaption>
	})
	// mit.use(hl)
</script>
<script>
    export let body
</script>

{@html mit.render(body)}