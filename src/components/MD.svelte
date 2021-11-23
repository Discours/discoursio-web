<script>
	import MD from 'markdown-it'
	// import hl from 'markdown-it-highlight'
	import mdanch from 'markdown-it-anchor'
	import mark from 'markdown-it-mark'
	import implicit from 'markdown-it-implicit-figures'
	import mdcustom from 'markdown-it-container'

	const mit = MD()
	mit.use(mdanch)
	// mit.use(hl)
	mit.use(mark)
	mit.use(mdcustom)

	mit.use(implicit, {
		dataType: false, // <figure data-type="image">
		figcaption: true // <figcaption>alternative text</figcaption>
	})

    export let body
</script>

{@html mit.render(body)}