<script context="module">
  export const load = async ({ fetch }) => {
    try {
      const response = await fetch('../../public/shouts.json', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit: 8 }),
      })
      const result = await response.json()
      return {
        props: { data: result.data },
      }
    } catch (error) {
      console.error(error)
    }
  }
</script>

<script>
  export let data
</script>

<pre>{JSON.stringify(data, null, 2)}</pre>
