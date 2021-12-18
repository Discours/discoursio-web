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

<div class="container">
	<div class="row">
		<div class="col-12">
			<P2P password={$webrtc.password}/>
			{#if $p2p && $p2p.awareness}
				<Editor body={$body} awareness={$p2p.awareness}/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	:global(.ProseMirror-prompt) {
		align-items: center;
		background: rgba(255,255,255,0.9);
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		left: 0 !important;
		position: absolute;
		top: 0 !important;
		width: 100%;
		z-index: 10;
	}

	:global(.ProseMirror-prompt form) {
		background: #fff;
		padding: 2rem;
	}
</style>
