import { useNavigate } from 'solid-app-router'
import { Show } from 'solid-js/web'
import Auth from '~/components/Nav/Auth'
import './passreset.css'

export default (props) => {
  const navigate = useNavigate()

  return (
    <div class='resetpage'>
      <Show
        when={props.code === 'password'}
        fallback={<Auth mode={'reset'} code={props.code} closeModal={() => navigate('/')} />}
      >
        <Auth mode={'password'} code={null} closeModal={() => navigate('/me')} />
      </Show>
    </div>
  )
}
