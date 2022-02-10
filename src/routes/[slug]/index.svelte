<script context="module">
  import subroutes from './routes.json'

  export const prerender = true

  export const load = async ({ params, fetch }) => {
    const { slug } = params
    let props = { slug }
    const at = slug.startsWith('@')
    if (subroutes.includes(slug) && !at) return { props }
    else {
      console.log(`[slug]: ${slug}`)
      const fq = await fetch(
        at ? `/user/${slug.slice(1)}.json` : `/${slug}.json`
      )
      if (fq.ok) {
        const data = await fq.json()
        props = { ...data, ...props }
      }
      return { props }
    }
  }
</script>

<script lang="ts">
  import ShoutFull from '../../components/ShoutFull.svelte'
  import UserFull from '../../components/UserFull.svelte'
  import SvelteSeo from 'svelte-seo'

  export let shout
  export let shouts
  export let comments
  export let user
  export let slug
  let title
  let component

  $: if (shout) {
    // console.log('[slug]: is shout')
    title = shout.title
    shout.comments = comments || []
    component = ShoutFull
  }

  $: if (slug.startsWith('@')) {
    // console.log('[slug]: is user')
    title = user?.usernam || slug
    component = UserFull
  }
  const meta = {
    title: 'Дискурс / ' + title,
    description:  (user ? 'Автор: ' + user.title + (user.bio? '\n'+user.bio : '') : (shout?.title ? shout.title : slug)),
    keywords: 'Discours.io, дискурс, самыздат, коллаборативная редакция, автор, ' + user?.username,
  }
</script>

<svelte:head><title>Дискурс : {title || slug}</title></svelte:head>
<SvelteSeo
  {...meta}
  openGraph={{
    ...meta,
    images: [{ url: user? user.userpic || 'nopic.jpg' : shout?.images }]
  }}
/>
<svelte:component this={component} props={{ shout, user, shouts }} />
