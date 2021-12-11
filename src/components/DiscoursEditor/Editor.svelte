<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import './custom.css'
	import { EditorView } from 'prosemirror-view'
	import { EditorState } from 'prosemirror-state'
	import { schema } from 'prosemirror-markdown'
	import { setup } from './setup'
	import { keymap } from 'prosemirror-keymap'
	import type { XmlFragment } from 'yjs'
	import {
		ySyncPlugin,
		yCursorPlugin,
		yUndoPlugin,
		undo,
		redo
	} from 'y-prosemirror'
	import type { Awareness } from 'y-protocols/awareness'

	export let awareness: Awareness = undefined
	export let body: XmlFragment

	let element: HTMLDivElement = undefined
	let view: EditorView = undefined

	onMount(() => {
		const plugins = [
			ySyncPlugin(body),
			yCursorPlugin(awareness),
			yUndoPlugin(),
			keymap({
				'Mod-z': undo,
				'Mod-y': redo,
				'Mod-Shift-z': redo
			})
		].concat(setup({ schema }))
		const state = EditorState.create({ schema, plugins })
		view = new EditorView(element, { state })
		view.focus()
		document.querySelector('.ProseMirror-menubar').setAttribute('style', '')
	})

	onDestroy(() => view.destroy())
</script>

<div class="editor" transition:fade bind:this={element} />

<style>
	.editor {
		justify-content: left;
		align-items: left;
	}
</style>
