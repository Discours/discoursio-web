<script context="module">
	import MD from 'markdown-it'
	import footnotePlugin from 'markdown-it-footnote'
	import markPlugin from 'markdown-it-mark'

	// import containerPlugin from 'markdown-it-container'
	const mit = new MD()
		// mit.use(containerPlugin, name [, options])
		.use(footnotePlugin)
		.use(markPlugin)

	export const router = false
</script>

<script lang="ts">
	import P2P from './P2P.svelte'
	import Editor from './Editor.svelte'
	import { p2p, ydoc, room, body, webrtc } from '../../stores/editor'

	$: if ($ydoc && $room) $body = $ydoc.getXmlFragment($room + '-body')
</script>

<P2P password={$webrtc.password} />
{#if $p2p && $p2p.awareness}
	<Editor body={$body} awareness={$p2p.awareness} />
{/if}
