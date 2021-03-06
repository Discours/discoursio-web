import { Show } from 'solid-js/web'
import { User } from '../../graphql/types.gen'
import './Userpic.scss'

interface UserpicProps {
  user: Partial<User>
}

export default (props: UserpicProps) => {
  const letters = () => {
    const names = props.user && props.user.name ? props.user.name.split(' ') : []

    return names[0][0] + (names.length > 1 ? names[1][0] : '')
  }

  return (
    <div class='circlewrap'>
      <Show
        when={props.user && props.user.userpic === ''}
        fallback={
          <img
            src={props.user.userpic ? props.user.userpic : '/icons/user-anonymous.svg'}
            alt={props.user.name || ''}
            classList={{ anonymous: !props.user.userpic }}
          />
        }
      >
        <div class='userpic'>{letters()}</div>
      </Show>
    </div>
  )
}
