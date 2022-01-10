
<script context="module">
export const prerender = false
export async function load({ session }) {
	if (!session?.user) return { status: 302, redirect: "/#auth" }
	else return { props: { user: session.user } }
}
</script>
<script lang="ts">
// import { session } from '$app/stores';
// $session.user;
// TODO: get settings from profile data
import Icon from '../../components/DiscoursIcon.svelte'
export let user
</script>

<svelte:head><title>Дискурс : Настройки</title></svelte:head>

<pre>{JSON.parse(user)}</pre>