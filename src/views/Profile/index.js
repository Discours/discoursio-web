import { createComputed, lazy } from 'solid-js'
import { useRouter, useStore } from '../../store'
const Profile = lazy(() => import('./Profile'))

export default function (props) {
  const [, { loadProfile, loadArticles }] = useStore()
  const { location } = useRouter()

  createComputed(() => props.routeName === 'profile' && loadProfile(props.params[0]))
  createComputed(
    () =>
      props.routeName === 'profile' &&
      (location().includes('/likes')
        ? loadArticles({ reviewer: props.params[0] })
        : loadArticles({ author: props.params[0] }))
  )

  return <Profile username={props.params[0]} />
}
