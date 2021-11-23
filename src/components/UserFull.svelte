<script>
    export let props
    let user
    $: user = props.user
    // TODO: UserFull - public user profile page
</script>
{#if user}
    <h3>{user.name}</h3>
{/if}