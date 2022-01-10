<script lang="ts">
	import { openModal } from '../stores/app'
	const action = '/user/feedback'
	const method = 'post'
	let msgElement: HTMLTextAreaElement
	let contact: string
	const submit = async () => {
		await fetch(action, {
			method,
			headers: {
				accept: 'application/json',
				'content-type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({ contact, message: msgElement.innerText })
		})
		$openModal = ''
	}
</script>

<form {method} {action}>
	<input
		type="text"
		name="contact"
		placeholder="Ваш контакт"
		bind:value={contact}
	/>
	<textarea
		cols="12"
		name="message"
		rows="3"
		placeholder="Напишите нам"
		bind:this={msgElement}
	/>
	<submit on:click|preventDefault={() => submit()} />
</form>
